import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AlertController, NavController, Platform, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LanguagePopoverComponent } from 'src/app/components/language-popover/language-popover.component';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { DeviceBackBtnService } from 'src/app/shared/srv/device-back-btn.service';
import { NetworkService } from 'src/app/shared/srv/network.service';
import { TranslationService } from 'src/app/shared/srv/translation.service';
import { UtilService } from 'src/app/shared/srv/util.service';
 
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  selectedFuel: any = '';

  isOnline = true;

  showHeader: boolean = true;
  activeTab: string = 'home'; // Default active tab
  currentUrl: string = '';
  isShowBack: boolean = false;
  stateSubscription!: Subscription;
  isHideBack: boolean = false;
  dynamicTitle: string = 'Fuel Mitra'; // Default title

  constructor(
    private router: Router,
    private deviceBackBtnService: DeviceBackBtnService,
    public networkService: NetworkService,
    private cdr: ChangeDetectorRef,
    public adsService: AdsService,
    public popoverCtrl: PopoverController,
    public translationService: TranslationService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public utilService: UtilService

  ) {

   this.stateSubscription = this.networkService.getNetworkStatus().subscribe((status) => {
      // console.log('---------------status-------',status);
      // if(status){
      //   this.adsService.showAdMobBanner();
      // }else{
      //   this.adsService.removeAdMobBanner();
      // } 
      this.isOnline = status;
      setTimeout(() => {
      this.cdr.detectChanges();
      });
    });

    this.stateSubscription = this.utilService.fuelState$.subscribe((state:any)=>{
      this.selectedFuel = localStorage.getItem('selectedFuel');
      // this.selectedFuel = selectedFuel || '';
    })
  }

  ngOnInit() {
    // Sync the active tab with the URL
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentUrl = this.router.url;
        this.updateActiveTabBasedOnUrl();
        this.toggleHeaderVisibility(this.currentUrl);
      });

    // Initialize back button handling
    this.deviceBackBtnService.initializeBackButtonHandler();
  
    this.adsService.showAdMobBanner();
      
  }

  ngOnDestroy() {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe();
    }
  }

  async openFuelSelection() {
    const alert = await this.alertCtrl.create({
      header: 'Select Fuel Type',
      inputs: [
        { type: 'radio', label: 'CNG', value: 'CNG', checked: this.selectedFuel === 'CNG' },
        { type: 'radio', label: 'PETROL', value: 'PETROL', checked: this.selectedFuel === 'PETROL' },
        { type: 'radio', label: 'DIESEL', value: 'DIESEL', checked: this.selectedFuel === 'DIESEL' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'OK',
          handler: (fuel) => {
            this.selectedFuel = fuel;
            localStorage.setItem('selectedFuel', fuel);
          }
        }
      ]
    });

    await alert.present();
  }
  updateActiveTabBasedOnUrl() {

    if (this.currentUrl.includes('/tabs/home')) {

      this.isShowBack = false;
    }else{
      this.isShowBack = true;
    }

    if (this.currentUrl.includes('/tabs/language-selection')) {
      this.isHideBack = true;
    }else {
      this.isHideBack = false;
    }

    // Set dynamic title based on current URL
    if (this.currentUrl.includes('/tabs/car-history')) {
      this.dynamicTitle = 'CAR_HISTORY';
    } else if (this.currentUrl.includes('/tabs/tractor-history')) {
      this.dynamicTitle = 'TRACTOR_HISTORY';
    } else if (this.currentUrl.includes('/tabs/mini-tractor-history')) {
      this.dynamicTitle = 'MINI_TRACTOR_HISTORY';
    } else if (this.currentUrl.includes('/tabs/jcb-history')) {
      this.dynamicTitle = 'JCB_HISTORY';
    } else if (this.currentUrl.includes('/tabs/fuel-quantity-calculator-history')) {
      this.dynamicTitle = 'FUEL_QUANTITY_HISTORY';
    } else if (this.currentUrl.includes('/tabs/fuel-quantity-price-history')) {
      this.dynamicTitle = 'FUEL_PRICE_HISTORY';
    } else if (this.currentUrl.includes('/tabs/range-calculator-history')) {
      this.dynamicTitle = 'RANGE_CALCULATOR_HISTORY';
    } else if (this.currentUrl.includes('/tabs/time-calculator-history')) {
      this.dynamicTitle = 'TIME_CALCULATOR_HISTORY';
    } else if (this.currentUrl.includes('/tabs/history')) {
      this.dynamicTitle = 'HISTORY';
    } else {
      this.dynamicTitle = 'Fuel Mitra'; // Default title
    }
  }

  toggleHeaderVisibility(url: string) {
    // Hide the header for the Privacy Policy page
    if (url.includes('/tabs/privacy-policy')) {
      this.showHeader = false;
    } else {
      this.showHeader = true;
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  goBack() {
    // If on a history sub-page, go back to main history page
    if (this.currentUrl.includes('/tabs/car-history') ||
        this.currentUrl.includes('/tabs/tractor-history') ||
        this.currentUrl.includes('/tabs/mini-tractor-history') ||
        this.currentUrl.includes('/tabs/jcb-history') ||
        this.currentUrl.includes('/tabs/fuel-quantity-calculator-history') ||
        this.currentUrl.includes('/tabs/fuel-quantity-price-history') ||
        this.currentUrl.includes('/tabs/range-calculator-history') ||
        this.currentUrl.includes('/tabs/time-calculator-history')) {
      this.navCtrl.navigateForward('/tabs/history');
    }
    // If on tractor fuel calculator sub-pages, go back to tractor fuel calculator
    else if (this.currentUrl.includes('/tabs/tractor-fuel-calculator/tractor-fuel-cost') ||
             this.currentUrl.includes('/tabs/tractor-fuel-calculator/tractor-worked-hours') ||
             this.currentUrl.includes('/tabs/tractor-fuel-calculator/tractor-hour-wise-money-cost') ||
             this.currentUrl.includes('/tabs/tractor-fuel-calculator/tractor-fera-cost')) {
      this.navCtrl.navigateForward('/tabs/tractor-fuel-calculator');
    }
    // If on mini tractor fuel calculator sub-pages, go back to mini tractor fuel calculator
    else if (this.currentUrl.includes('/tabs/mini-tractor-fuel-calculator/mini-tractor-fuel-cost') ||
             this.currentUrl.includes('/tabs/mini-tractor-fuel-calculator/mini-tractor-worked-hours') ||
             this.currentUrl.includes('/tabs/mini-tractor-fuel-calculator/mini-tractor-hour-wise-money-cost') ||
             this.currentUrl.includes('/tabs/mini-tractor-fuel-calculator/mini-tractor-fera-cost')) {
      this.navCtrl.navigateForward('/tabs/mini-tractor-fuel-calculator');
    }
    // If on JCB fuel calculator sub-pages, go back to JCB fuel calculator
    else if (this.currentUrl.includes('/tabs/jcb-fuel-calculator/jcb-fuel-cost') ||
             this.currentUrl.includes('/tabs/jcb-fuel-calculator/jcb-worked-hours') ||
             this.currentUrl.includes('/tabs/jcb-fuel-calculator/jcb-hour-wise-money-cost') ||
             this.currentUrl.includes('/tabs/jcb-fuel-calculator/jcb-fera-cost')) {
      this.navCtrl.navigateForward('/tabs/jcb-fuel-calculator');
    }
    else {
      this.navCtrl.navigateForward('/tabs/home');
    }
 }
}
