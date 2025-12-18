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
    console.log('Preparing to share record:', record);

    const selectedLanguage = this.translateService.currentLang || 'en';

    let message = '';

    // Build optional data section
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

    // Create specific messages for each mini tractor calculation type
    if (calculationType === 'FUEL_COST') {
      const appDetails: any = {
        en: `🚜 Mini Tractor Fuel Cost Calculation! ⛽💨
    Check out my mini tractor fuel expense details:

    Fuel Type: ${fuelType}

    🛣️ Distance: ${record.distance || 'N/A'} KM
    ⛽ Average: ${record.average || record.fuelAvgPerHour || 'N/A'} ${record.fuelAvgPerHour ? 'per hour' : 'KM/L'}
    💰 Fuel Price: ${record.fuelPrice || 'N/A'} per/liter${optionalDataSection}
    --------------------------------------------
    🚜 Total Fuel Cost: $${record.totalCost?.toFixed(2) || 'N/A'}

    📅 Date: ${new Date(record.date).toLocaleDateString()}

    Easily calculate your mini tractor fuel expenses with our app!
    📲 Download now: ${shareAppUrl}`,

        hi: `🚜 मिनी ट्रैक्टर ईंधन लागत गणना! ⛽💨
    मेरे मिनी ट्रैक्टर ईंधन खर्च का विवरण देखें:

    ईंधन प्रकार: ${fuelType}

    🛣️ दूरी: ${record.distance || 'N/A'} KM
    ⛽ औसत: ${record.average || record.fuelAvgPerHour || 'N/A'} ${record.fuelAvgPerHour ? 'प्रति घंटा' : 'KM/L'}
    💰 ईंधन मूल्य: ${record.fuelPrice || 'N/A'} प्रति/लीटर${optionalDataSection}
    ----------------------------------------
    🚜 कुल ईंधन लागत: ₹${record.totalCost?.toFixed(2) || 'N/A'}

    📅 दिनांक: ${new Date(record.date).toLocaleDateString()}

    हमारे ऐप से अपने मिनी ट्रैक्टर ईंधन खर्च की गणना करें!
    📲 अभी डाउनलोड करें: ${shareAppUrl}`,

        gu: `🚜 મિની ટ્રેક્ટર ઇંધણ ખર્ચ ગણતરી! ⛽💨
    મારા મિની ટ્રેક્ટર ઇંધણ ખર્ચનો વિગતવાર જુઓ:

    ઇંધણ પ્રકાર: ${fuelType}

    🛣️ અંતર: ${record.distance || 'N/A'} KM
    ⛽ એવરેજ: ${record.average || record.fuelAvgPerHour || 'N/A'} ${record.fuelAvgPerHour ? 'પ્રતિ કલાક' : 'KM/L'}
    💰 ઇંધણ કિંમત: ${record.fuelPrice || 'N/A'} પ્રતિ/લીટર${optionalDataSection}
    ------------------------------------------
    🚜 કુલ ઇંધણ ખર્ચ: ₹${record.totalCost?.toFixed(2) || 'N/A'}

    📅 તારીખ: ${new Date(record.date).toLocaleDateString()}

    અમારા એપથી તમારા મિની ટ્રેક્ટર ઇંધણ ખર્ચની ગણતરી કરો!
    📲 હમણાં ડાઉનલોડ કરો: ${shareAppUrl}`
      };
      message = appDetails[selectedLanguage] || appDetails.en;

    } else if (calculationType === 'WORKED_HOURS') {
      const appDetails: any = {
        en: `⏱️ Mini Tractor Worked Hours Calculation! 🚜💨
    Check out my mini tractor worked hours details:

    Fuel Type: ${fuelType}

    🕒 Start Time: ${record.startTime || 'N/A'}
    🕒 End Time: ${record.endTime || 'N/A'}
    ⏸️ Break Time: ${record.breakTime || 0} minutes${optionalDataSection}
    --------------------------------------------
    ⏱️ Total Worked Hours: ${record.totalWorkedHours || 'N/A'}

    📅 Date: ${new Date(record.date).toLocaleDateString()}

    Easily calculate your mini tractor worked hours with our app!
    📲 Download now: ${shareAppUrl}`,

        hi: `⏱️ मिनी ट्रैक्टर काम किए घंटे की गणना! 🚜💨
    मेरे मिनी ट्रैक्टर काम किए घंटे का विवरण देखें:

    ईंधन प्रकार: ${fuelType}

    🕒 प्रारंभ समय: ${record.startTime || 'N/A'}
    🕒 समाप्ति समय: ${record.endTime || 'N/A'}
    ⏸️ ब्रेक समय: ${record.breakTime || 0} मिनट${optionalDataSection}
    ----------------------------------------
    ⏱️ कुल काम किए घंटे: ${record.totalWorkedHours || 'N/A'}

    📅 दिनांक: ${new Date(record.date).toLocaleDateString()}

    हमारे ऐप से अपने मिनी ट्रैक्टर काम किए घंटे की गणना करें!
    📲 अभी डाउनलोड करें: ${shareAppUrl}`,

        gu: `⏱️ મિની ટ્રેક્ટર કામ કરેલ કલાકની ગણતરી! 🚜💨
    મારા મિની ટ્રેક્ટર કામ કરેલ કલાકનો વિગતવાર જુઓ:

    ઇંધણ પ્રકાર: ${fuelType}

    🕒 શરૂઆતનો સમય: ${record.startTime || 'N/A'}
    🕒 અંતિમ સમય: ${record.endTime || 'N/A'}
    ⏸️ બ્રેક સમય: ${record.breakTime || 0} મિનિટ${optionalDataSection}
    ------------------------------------------
    ⏱️ કુલ કામ કરેલ કલાક: ${record.totalWorkedHours || 'N/A'}

    📅 તારીખ: ${new Date(record.date).toLocaleDateString()}

    અમારા એપથી તમારા મિની ટ્રેક્ટર કામ કરેલ કલાકની ગણતરી કરો!
    📲 હમણાં ડાઉનલોડ કરો: ${shareAppUrl}`
      };
      message = appDetails[selectedLanguage] || appDetails.en;

    } else if (calculationType === 'HOUR_WISE_COST') {
      const appDetails: any = {
        en: `💰 Mini Tractor Hour Wise Cost Calculation! 🚜💨
    Check out my mini tractor hourly cost details:

    Fuel Type: ${fuelType}

    💵 Hourly Rate: ${record.hourlyRate || 'N/A'}
    ⏱️ Total Hours: ${record.totalHours || 'N/A'}${optionalDataSection}
    --------------------------------------------
    💰 Total Cost: $${record.totalCost?.toFixed(2) || 'N/A'}

    📅 Date: ${new Date(record.date).toLocaleDateString()}

    Easily calculate your mini tractor hourly costs with our app!
    📲 Download now: ${shareAppUrl}`,

        hi: `💰 मिनी ट्रैक्टर घंटे अनुसार लागत गणना! 🚜💨
    मेरे मिनी ट्रैक्टर घंटे अनुसार लागत का विवरण देखें:

    ईंधन प्रकार: ${fuelType}

    💵 प्रति घंटा दर: ${record.hourlyRate || 'N/A'}
    ⏱️ कुल घंटे: ${record.totalHours || 'N/A'}${optionalDataSection}
    ----------------------------------------
    💰 कुल लागत: ₹${record.totalCost?.toFixed(2) || 'N/A'}

    📅 दिनांक: ${new Date(record.date).toLocaleDateString()}

    हमारे ऐप से अपने मिनी ट्रैक्टर घंटे अनुसार लागत की गणना करें!
    📲 अभी डाउनलोड करें: ${shareAppUrl}`,

        gu: `💰 મિની ટ્રેક્ટર કલાક અનુસાર ખર્ચ ગણતરી! 🚜💨
    મારા મિની ટ્રેક્ટર કલાક અનુસાર ખર્ચનો વિગતવાર જુઓ:

    ઇંધણ પ્રકાર: ${fuelType}

    💵 પ્રતિ કલાક દર: ${record.hourlyRate || 'N/A'}
    ⏱️ કુલ કલાક: ${record.totalHours || 'N/A'}${optionalDataSection}
    ------------------------------------------
    💰 કુલ ખર્ચ: ₹${record.totalCost?.toFixed(2) || 'N/A'}

    📅 તારીખ: ${new Date(record.date).toLocaleDateString()}

    અમારા એપથી તમારા મિની ટ્રેક્ટર કલાક અનુસાર ખર્ચની ગણતરી કરો!
    📲 હમણાં ડાઉનલોડ કરો: ${shareAppUrl}`
      };
      message = appDetails[selectedLanguage] || appDetails.en;

    } else 
    if (calculationType === 'FERA_COST') {
      const appDetails: any = {
        en: `🌾 Mini Tractor Fera Cost Calculation! 🚜💨
    Check out my mini tractor fera cost details:

    Fuel Type: ${fuelType}

    📏 1 Fera Cost: ${record.distanceKm || 'N/A'} 
    💰 Total Fera: ${record.costPerKm || 'N/A'}${optionalDataSection}
    --------------------------------------------
    💸 Total Fera Cost: $${record.totalCost?.toFixed(2) || 'N/A'}

    📅 Date: ${new Date(record.date).toLocaleDateString()}

    Easily calculate your mini tractor fera costs with our app!
    📲 Download now: ${shareAppUrl}`,

        hi: `🌾 मिनी ट्रैक्टर फेरा लागत गणना! 🚜💨
    मेरे मिनी ट्रैक्टर फेरा लागत का विवरण देखें:

    ईंधन प्रकार: ${fuelType}

    📏 1 फेरा लागत: ${record.distanceKm || 'N/A'} 
    💰 कुल फेरा: ${record.costPerKm || 'N/A'}${optionalDataSection}
    ----------------------------------------
    💸 कुल फेरा लागत: ₹${record.totalCost?.toFixed(2) || 'N/A'}

    📅 दिनांक: ${new Date(record.date).toLocaleDateString()}

    हमारे ऐप से अपने मिनी ट्रैक्टर फेरा लागत की गणना करें!
    📲 अभी डाउनलोड करें: ${shareAppUrl}`,

        gu: `🌾 મિની ટ્રેક્ટર ફેરા ખર્ચ ગણતરી! 🚜💨
    મારા મિની ટ્રેક્ટર ફેરા ખર્ચનો વિગતવાર જુઓ:

    ઇંધણ પ્રકાર: ${fuelType}

    📏 1 એક ફેરાનો ભાવ: ${record.distanceKm || 'N/A'} 
    💰 કુલ ફેરા: ${record.costPerKm || 'N/A'}${optionalDataSection}
    ------------------------------------------
    💸 કુલ ફેરા ખર્ચ: ₹${record.totalCost?.toFixed(2) || 'N/A'}

    📅 તારીખ: ${new Date(record.date).toLocaleDateString()}

    અમારા એપથી તમારા મિની ટ્રેક્ટર ફેરા ખર્ચની ગણતરી કરો!
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
