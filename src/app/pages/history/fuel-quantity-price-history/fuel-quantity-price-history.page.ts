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
  selector: 'app-fuel-quantity-price-history',
  templateUrl: './fuel-quantity-price-history.page.html',
  styleUrls: ['./fuel-quantity-price-history.page.scss'],
})
export class FuelQuantityPriceHistoryPage implements OnInit, ViewWillEnter {
  appUrl: string = 'https://play.google.com/store/apps/details?id=com.msproducts.fuelApp';
  allRecords: FuelCostRecord[] = [];
  records: FuelCostRecord[] = [];
  pageTitle: string = 'Fuel Price History';

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
    this.pageTitle = this.translateService.instant('FUEL_PRICE_HISTORY');
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

      // Filter for fuel quantity price calculator records
      this.records = this.allRecords.filter(record => {
        const calculationType = record.calculationType;
        return calculationType === 'FUEL_QUANTITY_PRICE';
      });

      // Sort by date (newest first)
      this.records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      if (!this.records || this.records.length === 0) {
        this.presentToast('No fuel quantity price calculator records found.');
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
    await this.utilService.showLoading('Sharing...');

    const selectedLanguage = this.translateService.currentLang || 'en';
    let message = '';

    // Build message with data exactly as displayed in the record
    if (selectedLanguage === 'en') {
      message = `Total Fuel Quantity: ${record.fuelQuantity.toFixed(2)} L\n`;
      message += `Fuel Price: ${record.fuelPrice.toFixed(2)}\n`;
      if (record.name) message += `Name: ${record.name}\n`;
      if (record.villageName) message += `Village: ${record.villageName}\n`;
      if (record.mobile) message += `Mobile: ${record.mobile}\n`;
      if (record.notes) message += `Notes: ${record.notes}\n`;
      message += `Date: ${new Date(record.date).toLocaleDateString()}\n`;
      message += `Total Quantity Fuel Price: ${record.totalCost.toFixed(2)}`;
    } else if (selectedLanguage === 'hi') {
      message = `कुल ईंधन मात्रा: ${record.fuelQuantity.toFixed(2)} L\n`;
      message += `ईंधन मूल्य: ${record.fuelPrice.toFixed(2)}\n`;
      if (record.name) message += `नाम: ${record.name}\n`;
      if (record.villageName) message += `गांव: ${record.villageName}\n`;
      if (record.mobile) message += `मोबाइल: ${record.mobile}\n`;
      if (record.notes) message += `नोट्स: ${record.notes}\n`;
      message += `दिनांक: ${new Date(record.date).toLocaleDateString()}\n`;
      message += `कुल मात्रा ईंधन मूल्य: ${record.totalCost.toFixed(2)}`;
    } else if (selectedLanguage === 'gu') {
      message = `કુલ ઇંધણ માત્રા: ${record.fuelQuantity.toFixed(2)} L\n`;
      message += `ઇંધણ કિંમત: ${record.fuelPrice.toFixed(2)}\n`;
      if (record.name) message += `નામ: ${record.name}\n`;
      if (record.villageName) message += `ગામ: ${record.villageName}\n`;
      if (record.mobile) message += `મોબાઇલ: ${record.mobile}\n`;
      if (record.notes) message += `નોંધ: ${record.notes}\n`;
      message += `તારીખ: ${new Date(record.date).toLocaleDateString()}\n`;
      message += `કુલ માત્રા ઇંધણ કિંમત: ${record.totalCost.toFixed(2)}`;
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
