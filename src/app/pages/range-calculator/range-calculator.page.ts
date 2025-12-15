import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { LoadingService } from 'src/app/shared/srv/loading.service';
import { FuelCostStorageService } from 'src/app/shared/srv/fuel-cost-storage.service';
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
    if (this.totalRange !== null) {
      const fuelType = localStorage.getItem("selectedFuel") || "PETROL";
      const record: FuelCostRecord = {
        fuelPrice: this.fuelPrice,
        average: this.average,
        totalCost: this.fuelAmount,
        totalRange: this.totalRange,
        fuelType: fuelType,
        date: new Date().toISOString(),
        calculationType: 'RANGE_CALCULATOR',
        title: 'CALCULATE_RANGE',
      };

      try {
        await this.fuelCostStorage.saveRecord(record);
        this.utilService.showToast('Record saved successfully!', 2000, 'warning');

        this.resetForm();
        setTimeout(() => {
           this.navCtrl.navigateForward('/tabs/history');
           this.loadingService.stopLoader();
        }, 3000);
      } catch (error) {
        this.utilService.showToast('Failed to save record.', 2000, 'warning');
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
