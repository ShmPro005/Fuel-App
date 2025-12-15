import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { LoadingService } from 'src/app/shared/srv/loading.service';
import { FuelCostStorageService } from 'src/app/shared/srv/fuel-cost-storage.service';
import { UtilService } from 'src/app/shared/srv/util.service';
import { FuelCostRecord } from 'src/app/models/fuel-cost-record.model';

@Component({
  selector: 'app-jcb-fuel-cost',
  templateUrl: './jcb-fuel-cost.page.html',
  styleUrls: ['./jcb-fuel-cost.page.scss'],
})
export class JcbFuelCostPage {
  fuelAvgPerHour: any;
  fuelPrice: any;
  totalHours: any;
  totalCost: any = null;

  constructor(
    public adsService: AdsService,
    public loadingService: LoadingService,
    private router: Router,
    private fuelCostStorage: FuelCostStorageService,
    public utilService: UtilService,
    private navCtrl: NavController
  ) { }

  goBack() {
    this.router.navigate(['/jcb-fuel-calculator']);
  }

  calculateJcbFuelCost() {
    if (this.fuelAvgPerHour && this.fuelPrice && this.totalHours) {
      // this.adsService.showAdMobInterstitialAd();
      setTimeout(() => {
        const fuelNeeded = this.fuelAvgPerHour * this.totalHours;
        this.totalCost = fuelNeeded * this.fuelPrice;
        this.loadingService.stopLoader();
      }, 3000);

    }
  }

  async saveRecord() {
    this.adsService.showAdMobInterstitialAd();
    if (this.totalCost !== null) {
      const record: FuelCostRecord = {
        fuelAvgPerHour: this.fuelAvgPerHour,
        fuelPrice: this.fuelPrice,
        totalCost: this.totalCost,
        fuelType: "JCB",
        date: new Date().toISOString(),
        totalHours: this.totalHours,
        calculationType: 'FUEL_COST',
        title: 'JCB_FUEL_COST_CALCULATION',
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
    this.fuelAvgPerHour = null;
    this.fuelPrice = null;
    this.totalHours = null;
    this.totalCost = null;
  }
}
