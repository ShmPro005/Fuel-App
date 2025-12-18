import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { FuelCostRecord } from 'src/app/models/fuel-cost-record.model';
import { NavController, ToastController } from '@ionic/angular';
import { FuelCostStorageService } from 'src/app/shared/srv/fuel-cost-storage.service';
import { UtilService } from 'src/app/shared/srv/util.service';
import { Share } from '@capacitor/share';
import { TranslateService } from '@ngx-translate/core';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { LoadingService } from 'src/app/shared/srv/loading.service';

@Component({
  selector: 'app-mini-tractor-history',
  templateUrl: './mini-tractor-history.page.html',
  styleUrls: ['./mini-tractor-history.page.scss'],
})
export class MiniTractorHistoryPage implements OnInit, ViewWillEnter {
  appUrl: string = 'https://play.google.com/store/apps/details?id=com.msproducts.fuelApp';
  allRecords: FuelCostRecord[] = [];
  records: FuelCostRecord[] = [];
  pageTitle: string = 'Mini Tractor History';

  constructor(
    private fuelCostStorage: FuelCostStorageService,
    private toastController: ToastController,
    public utilService: UtilService,
    public navCtrl: NavController,
    public translateService: TranslateService,
    public adsService: AdsService,
    public loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.pageTitle = this.translateService.instant('MINI_TRACTOR_HISTORY');
    this.loadRecords();
  }

  ionViewWillEnter() {
    this.loadRecords();
  }

  goBack() {
    this.navCtrl.navigateForward('/tabs/history');
  }

  async loadRecords() {
    try {
      if (this.allRecords.length === 0) {
        await this.utilService.showLoading();
      }

      this.allRecords = await this.fuelCostStorage.getAllRecords();

      // Filter for mini tractor records
      this.records = this.allRecords.filter(record => {
        const fuelType = record.fuelType?.toUpperCase();
        return fuelType === 'MINI_TRACTOR' || fuelType === 'MINI-TRACTOR';
      });

      // Sort by date (newest first)
      this.records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      if (!this.records || this.records.length === 0) {
        this.presentToast('No mini tractor records found.');
      }
    } catch (error) {
      console.error('Error loading records:', error);
      if (error === 'Database not initialized') {
        this.presentToast('Database is not ready. Please try again later.');
      } else {
        this.presentToast('Failed to load records. Please check your storage.');
      }
    } finally {
      await this.utilService.dismissLoading().catch(err => {
        console.error('Error dismissing loading:', err);
      });
    }
  }

  async deleteRecord(record: FuelCostRecord) {
    if (!record.id) {
      this.presentToast('Record ID is missing.');
      return;
    }

    this.utilService.showConfirmationAlert(
      'Are you sure want to delete?',
      async () => {
        try {
          await this.utilService.showLoading('Deleting...');
          await this.fuelCostStorage.deleteRecord(record.id);
          await this.utilService.dismissLoading();

          this.utilService.showToast('Data deleted successfully!', 2000, 'success');
          console.log('Record deleted:', record);

          this.loadRecords().catch(err => {
            console.error('Silent reload error after deletion:', err);
          });
        } catch (error) {
          await this.utilService.dismissLoading();
          console.error('Delete operation failed:', error);
          this.utilService.showToast(
            'Failed to delete item. Please try again.',
            2000,
            'danger'
          );
        }
      }
    );
  }

  async shareRecord(record: any) {
    const shareAppUrl = 'https://play.google.com/store/apps/details?id=com.msproducts.fuelApp';

    await this.utilService.showLoading('Sharing...');
    const fuelType = record.fuelType;
    const calculationType = record.calculationType;
  
    const selectedLanguage = this.translateService.currentLang || 'en';
  
    let message = '';
  
    if (calculationType) {
      const isMachinery = record.totalHours !== undefined;
      let optionalDataSection = '';
      if (record.name || record.villageName || record.mobile || record.notes) {
        if (selectedLanguage === 'en') {
          if (record.name) optionalDataSection += `\n👤 Name: ${record.name}`;
          if (record.villageName) optionalDataSection += `\n🏠 Village: ${record.villageName}`;
          if (record.mobile) optionalDataSection += `\n📱 Mobile: ${record.mobile}`;
          if (record.notes) optionalDataSection += `\n📝 Notes: ${record.notes}`;
        } else if (selectedLanguage === 'hi') {
          if (record.name) optionalDataSection += `\n👤 नाम: ${record.name}`;
          if (record.villageName) optionalDataSection += `\n🏠 गांव: ${record.villageName}`;
          if (record.mobile) optionalDataSection += `\n📱 मोबाइल: ${record.mobile}`;
          if (record.notes) optionalDataSection += `\n📝 नोट्स: ${record.notes}`;
        } else if (selectedLanguage === 'gu') {
          if (record.name) optionalDataSection += `\n👤 નામ: ${record.name}`;
          if (record.villageName) optionalDataSection += `\n🏠 ગામ: ${record.villageName}`;
          if (record.mobile) optionalDataSection += `\n📱 મોબાઇલ: ${record.mobile}`;
          if (record.notes) optionalDataSection += `\n📝 નોંધ: ${record.notes}`;
        }
      }
  
      const appDetails: any = {
        en: isMachinery ? `⛽ Machinery Fuel Calculation Made Easy! 🚜💨
  Check out my fuel expense details:
  
  Type: ${fuelType}
  
  ⏱️ Total Hours: ${record.totalHours}
  ⛽ Average: ${record.fuelAvgPerHour} per hour
  💰 Fuel Price: ${record.fuelPrice} per/liter${optionalDataSection}
  --------------------------------------------
  🚜 Total Fuel Cost: $${record.totalCost.toFixed(2)}
  
  📅 Date: ${new Date(record.date).toLocaleDateString()}
  
  Easily calculate your machinery fuel expenses with our app!
  📲 Download now: ${shareAppUrl}` : `⛽ Fuel Calculation Made Easy! 🚗💨
  Check out my fuel expense details:
  
  Fuel Type: ${fuelType}
  
  🛣️ Distance: ${record.distance} KM
  ⛽ Average: ${record.average} KM/L
  💰 Fuel Price: ${record.fuelPrice} per/liter${optionalDataSection}
  --------------------------------------------
  🚗 Total Fuel Cost: $${record.totalCost.toFixed(2)}
  
  📅 Date: ${new Date(record.date).toLocaleDateString()}
  
  Easily calculate your fuel expenses with our app!
  📲 Download now: ${shareAppUrl}`,
  
        hi: isMachinery ? `⛽ मशीनरी ईंधन गणना आसान! 🚜💨
  मेरे ईंधन खर्च का विवरण देखें:
  
  प्रकार: ${fuelType}
  
  ⏱️ कुल घंटे: ${record.totalHours}
  ⛽ औसत: ${record.fuelAvgPerHour} प्रति घंटा
  💰 ईंधन मूल्य: ${record.fuelPrice} प्रति/लीटर${optionalDataSection}
  ----------------------------------------
  🚜 कुल ईंधन लागत: $${record.totalCost.toFixed(2)}
  
  📅 दिनांक: ${new Date(record.date).toLocaleDateString()}
  
  हमारे ऐप से अपनी मशीनरी ईंधन खर्च की गणना करें!
  📲 अभी डाउनलोड करें: ${shareAppUrl}` : `⛽ ईंधन गणना आसान! 🚗💨
  मेरे ईंधन खर्च का विवरण देखें:
  
  ईंधन प्रकार: ${fuelType}
  
  🛣️ दूरी: ${record.distance} KM
  ⛽ औसत: ${record.average} KM/L
  💰 ईंधन मूल्य: ${record.fuelPrice} प्रति/लीटर${optionalDataSection}
  ----------------------------------------
  🚗 कुल ईंधन लागत: $${record.totalCost.toFixed(2)}
  
  📅 दिनांक: ${new Date(record.date).toLocaleDateString()}
  
  हमारे ऐप से अपने ईंधन खर्च की गणना करें!
  📲 अभी डाउनलोड करें: ${shareAppUrl}`,
  
        gu: isMachinery ? `⛽ મશીનરી ઇંધણ ગણતરી સરળ! 🚜💨
  મારા ઇંધણ ખર્ચનો વિગતવાર જુઓ:
  
  પ્રકાર: ${fuelType}
  
  ⏱️ કુલ કલાક: ${record.totalHours}
  ⛽ એવરેજ: ${record.fuelAvgPerHour} પ્રતિ કલાક
  💰 ઇંધણ કિંમત: ${record.fuelPrice} પ્રતિ/લીટર${optionalDataSection}
  ------------------------------------------
  🚜 કુલ ઇંધણ ખર્ચ: $${record.totalCost.toFixed(2)}
  
  📅 તારીખ: ${new Date(record.date).toLocaleDateString()}
  
  અમારા એપથી તમારી મશીનરી ઇંધણ ખર્ચની ગણતરી કરો!
  📲 હમણાં ડાઉનલોડ કરો: ${shareAppUrl}` : `⛽ સરળ ઇંધણ ગણતરી! 🚗💨
  મારા ઇંધણ ખર્ચનો વિગતવાર જુઓ:
  
  ઇંધણ પ્રકાર: ${fuelType}
  
  🛣️ અંતર: ${record.distance} KM
  ⛽ એવરેજ: ${record.average} KM/L
  💰 ઇંધણ કિંમત: ${record.fuelPrice} પ્રતિ/લીટર${optionalDataSection}
  ------------------------------------------
  🚗 કુલ ઇંધણ ખર્ચ: $${record.totalCost.toFixed(2)}
  
  📅 તારીખ: ${new Date(record.date).toLocaleDateString()}
  
  અમારા એપથી તમારા ઇંધણ ખર્ચની ગણતરી કરો!
  📲 હમણાં ડાઉનલોડ કરો: ${shareAppUrl}`
      };
  
      message = appDetails[selectedLanguage] || appDetails.en;
    }
  
    try {
      await Share.share({
        title: this.translateService.instant('SHARE_TITLE'),
        text: message,
        dialogTitle: this.translateService.instant('SHARE_DIALOG_TITLE')
      });
  
      await this.utilService.dismissLoading();
    } catch (error) {
      console.error('Sharing failed:', error);
      await this.utilService.dismissLoading();
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
