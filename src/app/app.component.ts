

import { Component, OnInit } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { IndexedDbService } from './shared/srv/indexed-db.service';
import { AdsService } from './shared/srv/ads.service';
import { Platform, PopoverController } from '@ionic/angular';
import { DeviceBackBtnService } from './shared/srv/device-back-btn.service';
import { PermissionService } from './shared/srv/permission.service';
import { TranslationService } from './shared/srv/translation.service';
import { LanguagePopoverComponent } from './components/language-popover/language-popover.component';
import { Router } from '@angular/router';
import { SafeArea } from 'capacitor-plugin-safe-area';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public indexedDbService: IndexedDbService,
    public adsService: AdsService,
    private platform: Platform,
    private deviceBackBtnService: DeviceBackBtnService,
    private permissionService: PermissionService,
    private translationService: TranslationService,
    private popoverCtrl: PopoverController,
    public router: Router
  ) {

    // Set status bar color dynamically
    this.setStatusBarColor();
    this.initializeApp();
    // if (this.platform.is('android')) {
    //   SafeArea.getSafeAreaInsets().then((data) => {
    //     const { insets } = data;
    //     document.body.style.setProperty(
    //       '--ion-safe-area-top',
    //       `${insets.top}px`
    //     );
    //     document.body.style.setProperty(
    //       '--ion-safe-area-right',
    //       `${insets.right}px`
    //     );
    //     document.body.style.setProperty(
    //       '--ion-safe-area-left',
    //       `${insets.left}px`
    //     );
    //     document.body.style.setProperty(
    //       '--ion-safe-area-bottom',
    //       `${insets.bottom}px`
    //     );
    //   });
    // }
  }
  async ngOnInit() {
    const savedLang = localStorage.getItem('appLanguage');
    // console.log('--------savedLang-----',savedLang);

    if (!savedLang) {
      // console.log('--------savedLang-----in',savedLang);

      this.router.navigate(['tabs/language-selection']);
    }
  }
  async initializeApp() {
    this.permissionService.initializePermissions();

    // Initialize IndexedDB
    await this.initializeIndexedDB();

    await this.adsService.initializeAdMobSDK();

    this.platform.ready().then(() => {
      this.translationService.initTranslate();
      this.deviceBackBtnService.initializeBackButtonHandler();
      StatusBar.setOverlaysWebView({ overlay: false });
    });

  }

  async setStatusBarColor() {
    try {
      await StatusBar.setBackgroundColor({ color: '#5ed1aa' });
      await StatusBar.setStyle({ style: Style.Light });
    } catch (error) {
      console.error('Error setting status bar color:', error);
    }
    


  }

  async initializeIndexedDB() {
    try {
      // console.log('Initializing IndexedDB...');
      await this.indexedDbService.initDB();
      // console.log('IndexedDB initialized successfully');
    } catch (error) {
      console.error('Error initializing IndexedDB:', error);
    }
  }

  async presentLanguagePopover() {
    const popover = await this.popoverCtrl.create({
      component: LanguagePopoverComponent,
      translucent: true,
      backdropDismiss: false,
    });
    await popover.present();
  }
}

