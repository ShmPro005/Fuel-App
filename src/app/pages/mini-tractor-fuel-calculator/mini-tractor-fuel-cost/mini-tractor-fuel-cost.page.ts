import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { LoadingService } from 'src/app/shared/srv/loading.service';
import { FuelCostStorageService } from 'src/app/shared/srv/fuel-cost-storage.service';
import { SaveDataService } from 'src/app/shared/srv/save-data.service';
import { UtilService } from 'src/app/shared/srv/util.service';
import { FuelCostRecord } from 'src/app/models/fuel-cost-record.model';

@Component({
  selector: 'app-mini-tractor-fuel-cost',
  templateUrl: './mini-tractor-fuel-cost.page.html',
  styleUrls: ['./mini-tractor-fuel-cost.page.scss'],
})
export class MiniTractorFuelCostPage {
  fuelAvgPerHour: any;
  fuelPrice: any;
  totalHours: any;
  totalCost: any = null;

  constructor(
    public adsService: AdsService,
    public loadingService: LoadingService,
    private router: Router,
    private fuelCostStorage: FuelCostStorageService,
    private saveDataService: SaveDataService,
    public utilService: UtilService,
    private navCtrl: NavController
  ) { }

  goBack() {
    this.router.navigate(['/mini-tractor-fuel-calculator']);
  }

  validateTotalHours() {
    if (this.totalHours) {
      const parts = this.totalHours.split('.');
      const hours = parseInt(parts[0]) || 0;
      const minutes = parseInt(parts[1] || '0');

      // If minutes >= 60, round up to next hour
      if (minutes >= 60) {
        this.totalHours = (hours + 1).toString();
      }
    }
  }

  calculateMiniTractorFuelCost() {
    if (this.fuelAvgPerHour && this.fuelPrice && this.totalHours) {
      // this.adsService.showAdMobInterstitialAd();
      setTimeout(() => {
        // Parse totalHours as hours.minutes format
        const parts = this.totalHours.split('.');
        const hours = parseInt(parts[0]) || 0;
        const minutes = parseInt(parts[1] || '0');
        let totalMinutes = hours * 60 + minutes;

        // If minutes >= 60, round up to next hour
        if (minutes >= 60) {
          totalMinutes = (hours + 1) * 60;
        }

        // Calculate per minute fuel consumption
        const perMinuteFuel = this.fuelAvgPerHour / 60;

        // Calculate total fuel needed
        const fuelNeeded = perMinuteFuel * totalMinutes;
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
        fuelType: "MINI_TRACTOR",
        date: new Date().toISOString(),
        totalHours: this.totalHours,
        calculationType: 'FUEL_COST',
        title: 'MINI_TRACTOR_FUEL_COST_CALCULATION',
      };

      const action = await this.saveDataService.openSaveModal(record);
      console.log('Action returned:', action);

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
    this.fuelAvgPerHour = null;
    this.fuelPrice = null;
    this.totalHours = null;
    this.totalCost = null;
  }
}
