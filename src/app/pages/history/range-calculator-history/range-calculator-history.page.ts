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
  selector: 'app-range-calculator-history',
  templateUrl: './range-calculator-history.page.html',
  styleUrls: ['./range-calculator-history.page.scss'],
})
export class RangeCalculatorHistoryPage implements OnInit, ViewWillEnter {
  appUrl: string = 'https://play.google.com/store/apps/details?id=com.msproducts.fuelApp';
  allRecords: FuelCostRecord[] = [];
  records: FuelCostRecord[] = [];
  pageTitle!: string;

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
    this.pageTitle = this.translateService.instant('RANGE_CALCULATOR_HISTORY');
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

      // Filter for range calculator records
      this.records = this.allRecords.filter(record => {
        const calculationType = record.calculationType;
        return calculationType === 'RANGE_CALCULATOR';
      });

      // Sort by date (newest first)
      this.records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      if (!this.records || this.records.length === 0) {
        this.presentToast('No range calculator records found.');
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

    if (calculationType === 'RANGE_CALCULATOR') {
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
        en: `🛣️ Range Calculator Made Easy! 🚗💨
    Check out my range calculation details:

    Fuel Type: ${fuelType}

    💸 Fuel Amount: $${record.totalCost?.toFixed(2) || 'N/A'}
    💰 Fuel Price: ${record.fuelPrice || 'N/A'} per/liter
    🏎️ Average: ${record.average || 'N/A'} KM/L}${optionalDataSection}
    --------------------------------------------
    🛣️ Total Range: ${record.totalRange.toFixed(2) || 'N/A'} KM

    📅 Date: ${new Date(record.date).toLocaleDateString()}

    Easily calculate travel range with our app!
    📲 Download now: ${shareAppUrl}`,

        hi: `🛣️ रेंज कैलकुलेटर आसान! 🚗💨
    मेरी रेंज कैलकुलेशन का विवरण देखें:

    ईंधन प्रकार: ${fuelType}

    💸 ईंधन राशि: ₹${record.totalCost?.toFixed(2) || 'N/A'}
    💰 ईंधन मूल्य: ${record.fuelPrice || 'N/A'} प्रति/लीटर
    🏎️ औसत: ${record.average || 'N/A'} KM/L}${optionalDataSection}
    ----------------------------------------
    🛣️ कुल रेंज: ${record.totalRange.toFixed(2) || 'N/A'} KM

    📅 दिनांक: ${new Date(record.date).toLocaleDateString()}

    हमारे ऐप से यात्रा रेंज की गणना करें!
    📲 अभी डाउनलोड करें: ${shareAppUrl}`,

        gu: `🛣️ રેન્જ કેલ્ક્યુલેટર સરળ! 🚗💨
    મારી રેન્જ કેલ્ક્યુલેશનનો વિગતવાર જુઓ:

    ઇંધણ પ્રકાર: ${fuelType}

    💸 ઇંધણ રકમ: ₹${record.totalCost?.toFixed(2) || 'N/A'}
    💰 ઇંધણ કિંમત: ${record.fuelPrice || 'N/A'} પ્રતિ/લીટર
    🏎️ એવરેજ: ${record.average || 'N/A'} KM/L}${optionalDataSection}
    ------------------------------------------
    🛣️ કુલ રેન્જ: ${record.totalRange.toFixed(2) || 'N/A'} KM

    📅 તારીખ: ${new Date(record.date).toLocaleDateString()}

    અમારા એપથી મુસાફરી રેન્જની ગણતરી કરો!
    📲 હમણાં ડાઉનલોડ કરો: ${shareAppUrl}`
      };
      message = appDetails[selectedLanguage] || appDetails.en;
    }
    // console.log('Share message prepared:', message);
    

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
