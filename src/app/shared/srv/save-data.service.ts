import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FuelCostRecord } from 'src/app/models/fuel-cost-record.model';
import { FuelCostStorageService } from './fuel-cost-storage.service';
import { UtilService } from './util.service';
import { NavController } from '@ionic/angular';
import { LoadingService } from './loading.service';
import { SaveDataModalComponent } from 'src/app/components/save-data-modal/save-data-modal.component';
 
@Injectable({
  providedIn: 'root',
})
export class SaveDataService {
  constructor(
    private modalController: ModalController,
    private fuelCostStorage: FuelCostStorageService,
    private utilService: UtilService,
    private navCtrl: NavController,
    private loadingService: LoadingService
  ) {}

  async openSaveModal(record: FuelCostRecord): Promise<string> {
    const modal = await this.modalController.create({
      component: SaveDataModalComponent,
      componentProps: {
        record: record
      },
      backdropDismiss: false
    });

    const result = await modal.present();

    return new Promise((resolve) => {
      modal.onDidDismiss().then(async (dismissResult) => {
        if (dismissResult.data) {
          if (dismissResult.data.action === 'save') {
            await this.saveRecordWithOptionalData(dismissResult.data.record, dismissResult.data.optionalData);
            resolve('save');
          } else if (dismissResult.data.action === 'saveWithoutData') {
            await this.saveRecordWithOptionalData(dismissResult.data.record, {});
            resolve('saveWithoutData');
          } else {
            resolve('cancel');
          }
        } else {
          resolve('cancel');
        }
      });
    });
  }

  private async saveRecordWithOptionalData(record: FuelCostRecord, optionalData: any): Promise<void> {
    // Add optional data to the record
    if (optionalData.name) record.name = optionalData.name;
    if (optionalData.villageName) record.villageName = optionalData.villageName;
    if (optionalData.mobile) record.mobile = optionalData.mobile;
    if (optionalData.notes) record.notes = optionalData.notes;

    try {
      await this.fuelCostStorage.saveRecord(record);
      this.utilService.showToast('Record saved successfully!', 2000, 'warning');

      // Navigate to the specific history page based on record type
      const historyRoute = this.getHistoryRouteForRecord(record);
      setTimeout(() => {
        this.navCtrl.navigateForward(historyRoute);
        this.loadingService.stopLoader();
      }, 100);
    } catch (error) {
      this.utilService.showToast('Failed to save record.', 2000, 'warning');
    }
  }

  private getHistoryRouteForRecord(record: FuelCostRecord): string {
    const fuelType = record.fuelType?.toUpperCase();
    const calculationType = record.calculationType;

    // Determine the appropriate history route based on fuelType and calculationType
    if (calculationType === 'FUEL_QUANTITY') {
      return '/tabs/fuel-quantity-calculator-history';
    } else if (calculationType === 'FUEL_QUANTITY_PRICE') {
      return '/tabs/fuel-quantity-price-history';
    } else if (calculationType === 'RANGE_CALCULATOR') {
      return '/tabs/range-calculator-history';
    } else if (calculationType === 'TIME_CALCULATOR') {
      return '/tabs/time-calculator-history';
    } else if (fuelType === 'TRACTOR') {
      return '/tabs/tractor-history';
    } else if (fuelType === 'MINI_TRACTOR' || fuelType === 'MINI-TRACTOR') {
      return '/tabs/mini-tractor-history';
    } else if (fuelType === 'JCB') {
      return '/tabs/jcb-history';
    } else if (fuelType === 'CAR' || fuelType === 'PETROL' || fuelType === 'DIESEL') {
      return '/tabs/car-history';
    } else {
      // Fallback to main history page if no specific route matches
      return '/tabs/history';
    }
  }
}
