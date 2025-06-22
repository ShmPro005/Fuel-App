import { Component, OnInit } from '@angular/core';
import { FuelCostRecord } from 'src/app/models/fuel-cost-record.model';
import { NavController, ToastController } from '@ionic/angular';
import { FuelCostStorageService } from 'src/app/shared/srv/fuel-cost-storage.service';
import { UtilService } from 'src/app/shared/srv/util.service';
import { Share } from '@capacitor/share';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  appUrl: string = '';
  records: FuelCostRecord[] = [];
 
  constructor(
    private fuelCostStorage: FuelCostStorageService,
    private toastController: ToastController,
    public utilService: UtilService,
    public navCtrl: NavController,
    public translateService: TranslateService
  ) {

  }

  ngOnInit() {
    this.utilService.showLoading();
    setTimeout(() => {
    this.loadRecords();
    }, 500);
  }

  goBack() {
    this.navCtrl.navigateForward('/tabs/home');
  }

  async loadRecords() {
    try {
      this.records = await this.fuelCostStorage.getAllRecords();
      if (!this.records || this.records.length === 0) {
        this.presentToast('No records found.');
      } else {
        this.records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
      }
    } catch (error) {
      // console.log('Error loading records:', error);
      this.utilService.dismissLoading();
  
      if (error === 'Database not initialized') {
        this.presentToast('Database is not ready. Please try again later.');
      } else {
        this.presentToast('Failed to load records. Please check your storage.');
      }
    } finally {
      this.utilService.dismissLoading();

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
          // 1) Delete from IndexedDB by ID
          await this.fuelCostStorage.deleteRecord(record.id);
          // 2) Show success message
          // this.presentToast('Record deleted successfully.');
         await this.loadRecords();
          this.utilService.showToast('Data deleted successfully!', 2000, 'warning');
          this.utilService.dismissLoading();
        } catch (error) {
          // console.log('Error deleting item:', error);
          this.utilService.dismissLoading();
          this.utilService.showToast(
            'Failed to delete item. Please try again.',
            1000,
            'danger'
          );
        }
      }
    );
  }


  async shareRecord(record: any) {
    const shareAppUrl = 'https://play.google.com/store/apps/details?id=com.example.fuelapp';

    this.utilService.showLoading('Sharing...');
    const fuelType = record.fuelType; 

    const selectedLanguage = this.translateService.currentLang || 'en';  

    const appDetails: any = {
      en: `⛽ Fuel Calculation Made Easy! 🚗💨
    Check out my fuel expense details:
    
    Fuel Type: ${fuelType}

    🛣️ Distance: ${record.distance} KM
    ⛽ Average: ${record.average} KM/L
    💰 Fuel Price: ${record.fuelPrice} per/liter
    --------------------------------------------
    🚗 Total Fuel Cost: ${record.totalCost}

    📅 Date: ${new Date(record.date).toLocaleDateString()}
    
    Easily calculate your fuel expenses with our app!
    📲 Download now: ${shareAppUrl}`,
    
      hi: `⛽ ईंधन गणना आसान! 🚗💨
    मेरे ईंधन खर्च का विवरण देखें:
    
    ईंधन प्रकार: ${fuelType} 
    
    🛣️ दूरी: ${record.distance} KM
    ⛽ औसत: ${record.average} KM/L
    💰 ईंधन मूल्य: ${record.fuelPrice} प्रति/लीटर
    ----------------------------------------
    🚗 कुल ईंधन लागत: ${record.totalCost}

    📅 दिनांक: ${new Date(record.date).toLocaleDateString()}
    
    हमारे ऐप से अपने ईंधन खर्च की गणना करें!
    📲 अभी डाउनलोड करें: ${shareAppUrl}`,
    
      gu: `⛽ સરળ ઇંધણ ગણતરી! 🚗💨
    મારા ઇંધણ ખર્ચનો વિગતવાર જુઓ:
    
    ઇંધણ પ્રકાર: ${fuelType}

    🛣️ અંતર: ${record.distance} KM
    ⛽ એવરેજ: ${record.average} KM/L
    💰 ઇંધણ કિંમત: ${record.fuelPrice} પ્રતિ/લીટર
    ------------------------------------------
    🚗 કુલ ઇંધણ ખર્ચ: ${record.totalCost}

    📅 તારીખ: ${new Date(record.date).toLocaleDateString()}
    
    અમારા એપથી તમારા ઇંધણ ખર્ચની ગણતરી કરો!
    📲 હમણાં ડાઉનલોડ કરો: ${shareAppUrl}`
    };
    

 
    const message = appDetails[selectedLanguage] || appDetails.en;
 
    try {
      await Share.share({
        title: this.translateService.instant('SHARE_TITLE'),
        text: message,
        dialogTitle: this.translateService.instant('SHARE_DIALOG_TITLE')
      });
      
      this.utilService.dismissLoading();
    } catch (error) {
      console.error('Sharing failed:', error);
      this.utilService.dismissLoading();
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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
