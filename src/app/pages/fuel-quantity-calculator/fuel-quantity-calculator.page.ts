import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { LoadingService } from 'src/app/shared/srv/loading.service';
import { FuelCostStorageService } from 'src/app/shared/srv/fuel-cost-storage.service';
import { UtilService } from 'src/app/shared/srv/util.service';
import { FuelCostRecord } from 'src/app/models/fuel-cost-record.model';

@Component({
  selector: 'app-fuel-quantity-calculator',
  templateUrl: './fuel-quantity-calculator.page.html',
  styleUrls: ['./fuel-quantity-calculator.page.scss'],
})
export class FuelQuantityCalculatorPage {
  totalFuelPrice: any;
  fuelPrice: any;
  liters: any = null;

  constructor(
    public adsService: AdsService,
    public loadingService: LoadingService,
    private fuelCostStorage: FuelCostStorageService,
    public utilService: UtilService,
    private navCtrl: NavController
  ) { }

  calculateFuelQuantity() {
    if (this.totalFuelPrice && this.fuelPrice) {
      // this.adsService.showAdMobInterstitialAd();
      setTimeout(() => {
      this.liters = this.totalFuelPrice / this.fuelPrice;
      this.loadingService.stopLoader
      }, 500);
    }else {
      this.liters = null;
    }
  }

  async saveRecord() {
    this.adsService.showAdMobInterstitialAd();
    if (this.liters !== null) {
      const fuelType = localStorage.getItem("selectedFuel") || "PETROL";
      const record: FuelCostRecord = {
        fuelPrice: this.fuelPrice,
        totalCost: this.totalFuelPrice,
        liters: this.liters,
        fuelType: fuelType,
        date: new Date().toISOString(),
        calculationType: 'FUEL_QUANTITY',
        title: 'CALCULATE_FUEL_QUANTITY',
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
    this.totalFuelPrice = null;
    this.fuelPrice = null;
    this.liters = null;
  }
}
