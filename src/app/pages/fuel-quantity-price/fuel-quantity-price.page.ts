import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { LoadingService } from 'src/app/shared/srv/loading.service';
import { FuelCostStorageService } from 'src/app/shared/srv/fuel-cost-storage.service';
import { SaveDataService } from 'src/app/shared/srv/save-data.service';
import { UtilService } from 'src/app/shared/srv/util.service';
import { FuelCostRecord } from 'src/app/models/fuel-cost-record.model';

@Component({
  selector: 'app-fuel-quantity-price',
  templateUrl: './fuel-quantity-price.page.html',
  styleUrls: ['./fuel-quantity-price.page.scss'],
})
export class FuelQuantityPricePage implements OnInit {
  fuelQuantity: any = '';
  fuelPrice: any = '';
  totalCost: number | null = null;


  constructor(
    public adsService: AdsService,
    public loadingService: LoadingService,
    private fuelCostStorage: FuelCostStorageService,
    private saveDataService: SaveDataService,
    public utilService: UtilService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }


  calculateTotalCost() {
    if (this.fuelQuantity && this.fuelPrice) {
      this.adsService.showAdMobInterstitialAd();
      setTimeout(() => {
      this.totalCost = this.fuelQuantity * this.fuelPrice;
      this.loadingService.stopLoader();
      }, 100);
    } else {
      this.totalCost = null;
    }
  }

  async saveRecord() {
    // this.adsService.showAdMobInterstitialAd();
    const fuelType = localStorage.getItem("selectedFuel") || "PETROL";
    if (this.totalCost !== null) {
      const record: FuelCostRecord = {
        fuelQuantity: this.fuelQuantity,
        fuelPrice: this.fuelPrice,
        totalCost: this.totalCost,
        fuelType: fuelType,
        calculationType: 'FUEL_QUANTITY_PRICE',
        title: 'CALCULATE_FUEL_QUANTITY_Price',
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
    this.fuelQuantity = '';
    this.fuelPrice = '';
    this.totalCost = null;
  }
}
