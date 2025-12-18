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
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit, ViewWillEnter {
  appUrl: string = 'https://play.google.com/store/apps/details?id=com.msproducts.fuelApp';
  records: FuelCostRecord[] = [];
 
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
    // Don't show loading on init - let ionViewWillEnter handle it
    this.loadRecords();

  }

  ionViewWillEnter() {
    // Load records when view is about to enter
    this.loadRecords();
  }

  goBack() {
    this.navCtrl.navigateForward('/tabs/home');
  }

  goToCarHistory() {
    this.navCtrl.navigateForward('/tabs/car-history');
  }

  goToTractorHistory() {
    this.navCtrl.navigateForward('/tabs/tractor-history');
  }

  goToMiniTractorHistory() {
    this.navCtrl.navigateForward('/tabs/mini-tractor-history');
  }

  goToJCBHistory() {
    this.navCtrl.navigateForward('/tabs/jcb-history');
  }

  goToFuelQuantityHistory() {
    this.navCtrl.navigateForward('/tabs/fuel-quantity-calculator-history');
  }

  goToFuelQuantityPriceHistory() {
    this.navCtrl.navigateForward('/tabs/fuel-quantity-price-history');
  }

  goToRangeCalculatorHistory() {
    this.navCtrl.navigateForward('/tabs/range-calculator-history');
  }

  goToTimeCalculatorHistory() {
    this.navCtrl.navigateForward('/tabs/time-calculator-history');
  }

  async loadRecords() {
    try {
      // Show loading only if records are empty (first load)
      if (this.records.length === 0) {
        await this.utilService.showLoading();
      }
      
      this.records = await this.fuelCostStorage.getAllRecords();
      console.log('Loaded records:', this.records);
      
      if (!this.records || this.records.length === 0) {
        this.presentToast('No records found.');
      } else {
        // Sort by date (newest first)
        this.records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
    } catch (error) {
      console.error('Error loading records:', error);
      
      if (error === 'Database not initialized') {
        this.presentToast('Database is not ready. Please try again later.');
      } else {
        this.presentToast('Failed to load records. Please check your storage.');
      }
    } finally {
      // Safely dismiss loading
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
          // Show loading
          await this.utilService.showLoading('Deleting...');
          
          // Delete from IndexedDB
          await this.fuelCostStorage.deleteRecord(record.id);
          
          // Dismiss loading
          await this.utilService.dismissLoading();
          
          // Show success message
          this.utilService.showToast('Data deleted successfully!', 2000, 'success');
          console.log('Record deleted:', record);
          
          // Reload silently - catch and log errors without showing to user
          this.loadRecords().catch(err => {
            console.error('Silent reload error after deletion:', err);
            // Don't show error to user - deletion was successful
          });
          
          // Optional: Show ad
          // this.adsService.showAdMobInterstitialAd();
          
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

    if (calculationType === 'FUEL_COST') {
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
    💰 Fuel Price: ${record.fuelPrice} per/liter}${optionalDataSection}
    --------------------------------------------
    🚜 Total Fuel Cost: $${record.totalCost.toFixed(2)}

    📅 Date: ${new Date(record.date).toLocaleDateString()}

    Easily calculate your machinery fuel expenses with our app!
    📲 Download now: ${shareAppUrl}` : `⛽ Fuel Calculation Made Easy! 🚗💨
    Check out my fuel expense details:

    Fuel Type: ${fuelType}

    🛣️ Distance: ${record.distance} KM
    ⛽ Average: ${record.average} KM/L
    💰 Fuel Price: ${record.fuelPrice} per/liter}${optionalDataSection}
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
    💰 ईंधन मूल्य: ${record.fuelPrice} प्रति/लीटर}${optionalDataSection}
    ----------------------------------------
    🚜 कुल ईंधन लागत: ₹${record.totalCost.toFixed(2)}

    📅 दिनांक: ${new Date(record.date).toLocaleDateString()}

    हमारे ऐप से अपनी मशीनरी ईंधन खर्च की गणना करें!
    📲 अभी डाउनलोड करें: ${shareAppUrl}` : `⛽ ईंधन गणना आसान! 🚗💨
    मेरे ईंधन खर्च का विवरण देखें:

    ईंधन प्रकार: ${fuelType}

    🛣️ दूरी: ${record.distance} KM
    ⛽ औसत: ${record.average} KM/L
    💰 ईंधन मूल्य: ${record.fuelPrice} प्रति/लीटर}${optionalDataSection}
    ----------------------------------------
    🚗 कुल ईंधन लागत: ₹${record.totalCost.toFixed(2)}

    📅 दिनांक: ${new Date(record.date).toLocaleDateString()}

    हमारे ऐप से अपने ईंधन खर्च की गणना करें!
    📲 अभी डाउनलोड करें: ${shareAppUrl}`,

        gu: isMachinery ? `⛽ મશીનરી ઇંધણ ગણતરી સરળ! 🚜💨
    મારા ઇંધણ ખર્ચનો વિગતવાર જુઓ:

    પ્રકાર: ${fuelType}

    ⏱️ કુલ કલાક: ${record.totalHours}
    ⛽ એવરેજ: ${record.fuelAvgPerHour} પ્રતિ કલાક
    💰 ઇંધણ કિંમત: ${record.fuelPrice} પ્રતિ/લીટર}${optionalDataSection}
    ------------------------------------------
    🚜 કુલ ઇંધણ ખર્ચ: ₹${record.totalCost.toFixed(2)}

    📅 તારીખ: ${new Date(record.date).toLocaleDateString()}

    અમારા એપથી તમારી મશીનરી ઇંધણ ખર્ચની ગણતરી કરો!
    📲 હમણાં ડાઉનલોડ કરો: ${shareAppUrl}` : `⛽ સરળ ઇંધણ ગણતરી! 🚗💨
    મારા ઇંધણ ખર્ચનો વિગતવાર જુઓ:

    ઇંધણ પ્રકાર: ${fuelType}

    🛣️ અંતર: ${record.distance} KM
    ⛽ એવરેજ: ${record.average} KM/L
    💰 ઇંધણ કિંમત: ${record.fuelPrice} પ્રતિ/લીટર}${optionalDataSection}
    ------------------------------------------
    🚗 કુલ ઇંધણ ખર્ચ: ₹${record.totalCost.toFixed(2)}

    📅 તારીખ: ${new Date(record.date).toLocaleDateString()}

    અમારા એપથી તમારા ઇંધણ ખર્ચની ગણતરી કરો!
    📲 હમણાં ડાઉનલોડ કરો: ${shareAppUrl}`
      };
      message = appDetails[selectedLanguage] || appDetails.en;
    } else if (calculationType === 'WORKED_HOURS') {
      const appDetails: any = {
        en: `⏱️ Worked Hours Calculation! ⏰
    Check out my worked hours details:

    Type: ${fuelType}

    🕒 Start Time: ${record.startTime}
    🕒 End Time: ${record.endTime}
    ⏸️ Break Time: ${record.breakTime || 0} minutes
    --------------------------------------------
    ⏱️ Total Worked Hours: ${record.totalWorkedHours}

    📅 Date: ${new Date(record.date).toLocaleDateString()}

    Easily calculate your worked hours with our app!
    📲 Download now: ${shareAppUrl}`,

        hi: `⏱️ काम के घंटे की गणना! ⏰
    मेरे काम के घंटे का विवरण देखें:

    प्रकार: ${fuelType}

    🕒 प्रारंभ समय: ${record.startTime}
    🕒 समाप्ति समय: ${record.endTime}
    ⏸️ ब्रेक समय: ${record.breakTime || 0} मिनट
    ----------------------------------------
    ⏱️ कुल काम के घंटे: ${record.totalWorkedHours}

    📅 दिनांक: ${new Date(record.date).toLocaleDateString()}

    हमारे ऐप से अपने काम के घंटे की गणना करें!
    📲 अभी डाउनलोड करें: ${shareAppUrl}`,

        gu: `⏱️ કામના કલાકોની ગણતરી! ⏰
    મારા કામના કલાકોનો વિગતવાર જુઓ:

    પ્રકાર: ${fuelType}

    🕒 શરૂઆતનો સમય: ${record.startTime}
    🕒 અંતનો સમય: ${record.endTime}
    ⏸️ બ્રેક સમય: ${record.breakTime || 0} મિનિટ
    ------------------------------------------  
    ⏱️ કુલ કામના કલાક: ${record.totalWorkedHours}

    📅 તારીખ: ${new Date(record.date).toLocaleDateString()}

    અમારા એપથી તમારા કામના કલાકોની ગણતરી કરો!
    📲 હમણાં ડાઉનલોડ કરો: ${shareAppUrl}`
      };
      message = appDetails[selectedLanguage] || appDetails.en;
    } else if (calculationType === 'HOUR_WISE_COST') {
      const appDetails: any = {
        en: `💰 Hour Wise Cost Calculation! 💸
    Check out my cost details:

    Type: ${fuelType}

    💵 Hourly Rate: ${record.hourlyRate}
    ⏱️ Total Hours: ${record.totalHours}
    --------------------------------------------
    💰 Total Cost: ${record.totalCost}

    📅 Date: ${new Date(record.date).toLocaleDateString()}

    Easily calculate your costs with our app!
    📲 Download now: ${shareAppUrl}`,

        hi: `💰 घंटे अनुसार लागत गणना! 💸
    मेरी लागत का विवरण देखें:

    प्रकार: ${fuelType}

    💵 प्रति घंटा दर: ${record.hourlyRate}
    ⏱️ कुल घंटे: ${record.totalHours}
    ----------------------------------------
    💰 कुल लागत: ${record.totalCost}

    📅 दिनांक: ${new Date(record.date).toLocaleDateString()}

    हमारे ऐप से अपनी लागत की गणना करें!
    📲 अभी डाउनलोड करें: ${shareAppUrl}`,

        gu: `💰 કલાક અનુસાર ખર્ચની ગણતરી! 💸
    મારા ખર્ચનો વિગતવાર જુઓ:

    પ્રકાર: ${fuelType}

    💵 પ્રતિ કલાક દર: ${record.hourlyRate}
    ⏱️ કુલ કલાક: ${record.totalHours}
    ------------------------------------------  
    💰 કુલ ખર્ચ: ${record.totalCost}

    📅 તારીખ: ${new Date(record.date).toLocaleDateString()}

    અમારા એપથી તમારા ખર્ચની ગણતરી કરો!
    📲 હમણાં ડાઉનલોડ કરો: ${shareAppUrl}`
      };
      message = appDetails[selectedLanguage] || appDetails.en;
    } else if (calculationType === 'FERA_COST') {
      const appDetails: any = {
        en: `🚜 Fera Cost Calculation! 🌾
    Check out my fera cost details:

    Type: ${fuelType}

    📏 Distance: ${record.distanceKm} KM
    💰 Cost per KM: ${record.costPerKm}
    --------------------------------------------
    💸 Total Cost: ${record.totalCost}

    📅 Date: ${new Date(record.date).toLocaleDateString()}

    Easily calculate your fera costs with our app!
    📲 Download now: ${shareAppUrl}`,

        hi: `🚜 फेरा लागत गणना! 🌾
    मेरी फेरा लागत का विवरण देखें:

    प्रकार: ${fuelType}

    📏 दूरी: ${record.distanceKm} KM
    💰 प्रति KM लागत: ${record.costPerKm}
    ----------------------------------------
    💸 कुल लागत: ${record.totalCost}

    📅 दिनांक: ${new Date(record.date).toLocaleDateString()}

    हमारे ऐप से अपनी फेरा लागत की गणना करें!
    📲 अभी डाउनलोड करें: ${shareAppUrl}`,

        gu: `🚜 ફેરા ખર્ચની ગણતરી! 🌾
    મારા ફેરા ખર્ચનો વિગતવાર જુઓ:

    પ્રકાર: ${fuelType}

    📏 અંતર: ${record.distanceKm} KM
    💰 પ્રતિ KM ખર્ચ: ${record.costPerKm}
    ------------------------------------------  
    💸 કુલ ખર્ચ: ${record.totalCost}

    📅 તારીખ: ${new Date(record.date).toLocaleDateString()}

    અમારા એપથી તમારા ફેરા ખર્ચની ગણતરી કરો!
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
  
  async clearAllRecords() {
    try {
      await this.fuelCostStorage.clearAllRecords();
      this.presentToast('All records cleared successfully.');
      this.loadRecords();
    } catch (error) {
      console.error('Error clearing records:', error);
      this.presentToast('Failed to clear records.');
    }
  }

  getRecordCount(type: string): number {
    if (!this.records || this.records.length === 0) {
      return 0;
    }

    // Handle fuel types
    if (type === 'CAR') {
      return this.records.filter(record =>
        record.fuelType?.toUpperCase() === 'CAR' ||
        record.fuelType?.toUpperCase() === 'PETROL' ||
        record.fuelType?.toUpperCase() === 'DIESEL'
      ).length;
    } else if (type === 'TRACTOR') {
      return this.records.filter(record =>
        record.fuelType?.toUpperCase() === 'TRACTOR'
      ).length;
    } else if (type === 'MINI_TRACTOR') {
      return this.records.filter(record =>
        record.fuelType?.toUpperCase() === 'MINI_TRACTOR' ||
        record.fuelType?.toUpperCase() === 'MINI-TRACTOR'
      ).length;
    } else if (type === 'JCB') {
      return this.records.filter(record =>
        record.fuelType?.toUpperCase() === 'JCB'
      ).length;
    }
    // Handle calculation types
    else if (type === 'FUEL_QUANTITY') {
      return this.records.filter(record =>
        record.calculationType === 'FUEL_QUANTITY'
      ).length;
    } else if (type === 'FUEL_QUANTITY_PRICE') {
      return this.records.filter(record =>
        record.calculationType === 'FUEL_QUANTITY_PRICE'
      ).length;
    } else if (type === 'RANGE_CALCULATOR') {
      return this.records.filter(record =>
        record.calculationType === 'RANGE_CALCULATOR'
      ).length;
    } else if (type === 'TIME_CALCULATOR') {
      return this.records.filter(record =>
        record.calculationType === 'TIME_CALCULATOR'
      ).length;
    }

    return 0;
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
