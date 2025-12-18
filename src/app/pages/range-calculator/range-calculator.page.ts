import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { LoadingService } from 'src/app/shared/srv/loading.service';
import { FuelCostStorageService } from 'src/app/shared/srv/fuel-cost-storage.service';
import { SaveDataService } from 'src/app/shared/srv/save-data.service';
import { UtilService } from 'src/app/shared/srv/util.service';
import { FuelCostRecord } from 'src/app/models/fuel-cost-record.model';

@Component({
  selector: 'app-range-calculator',
  templateUrl: './range-calculator.page.html',
  styleUrls: ['./range-calculator.page.scss'],
})
export class RangeCalculatorPage {
  fuelAmount: any; // total money spent on fuel
  fuelPrice: any;
  average: any;
  totalRange: any = null;

  constructor(
    private adsService: AdsService,
    public loadingService: LoadingService,
    private fuelCostStorage: FuelCostStorageService,
    private saveDataService: SaveDataService,
    public utilService: UtilService,
    private navCtrl: NavController
  ) {}

  calculateRange() {
    if (this.fuelAmount && this.fuelPrice && this.average) {
      this.adsService.showAdMobInterstitialAd();
      setTimeout(() => {
        const litersBought = this.fuelAmount / this.fuelPrice;
        this.totalRange = litersBought * this.average;
        this.loadingService.stopLoader();
      }, 3000);
    }
  }
  goBack() {
    window.history.back();
 }

  async saveRecord() {
    // this.adsService.showAdMobInterstitialAd();
    const fuelType = localStorage.getItem("selectedFuel") || "PETROL";
    if (this.totalRange !== null) {
      const record: FuelCostRecord = {
        fuelPrice: this.fuelPrice,
        average: this.average,
        totalCost: this.fuelAmount,
        totalRange: this.totalRange,
        fuelType: fuelType,
        calculationType: 'RANGE_CALCULATOR',
        title: 'CALCULATE_RANGE',
        date: new Date().toISOString(),
      };

      const action = await this.saveDataService.openSaveModal(record);
      if (action === 'save' || action === 'saveWithoutData') {
        this.resetForm();
      } else if (action === 'cancel') {
        // Handle cancel action - form remains as is
        console.log('User cancelled the save operation');
      }
    } else {
      this.utilService.showToast('No result to save.', 2000, 'warning');
    }
  }

  resetForm() {
    this.fuelAmount = null;
    this.fuelPrice = null;
    this.average = null;
    this.totalRange = null;
  }
}
