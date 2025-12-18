import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { LoadingService } from 'src/app/shared/srv/loading.service';
import { FuelCostStorageService } from 'src/app/shared/srv/fuel-cost-storage.service';
import { SaveDataService } from 'src/app/shared/srv/save-data.service';
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
    private saveDataService: SaveDataService,
    public utilService: UtilService,
    private navCtrl: NavController
  ) { }

  calculateFuelQuantity() {
    if (this.totalFuelPrice && this.fuelPrice) {
      this.adsService.showAdMobInterstitialAd();
      setTimeout(() => {
      this.liters = this.totalFuelPrice / this.fuelPrice;
      this.loadingService.stopLoader();
      }, 3000);
    }else {
      this.liters = null;
    }
  }

  async saveRecord() {
    // this.adsService.showAdMobInterstitialAd();
    const fuelType = localStorage.getItem("selectedFuel") || "PETROL";
    if (this.liters !== null) {
      const record: FuelCostRecord = {
        fuelPrice: this.fuelPrice,
        totalCost: this.totalFuelPrice,
        liters: this.liters,
        fuelType: fuelType,
        calculationType: 'FUEL_QUANTITY',
        title: 'CALCULATE_FUEL_QUANTITY',
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
    this.totalFuelPrice = null;
    this.fuelPrice = null;
    this.liters = null;
  }
}
