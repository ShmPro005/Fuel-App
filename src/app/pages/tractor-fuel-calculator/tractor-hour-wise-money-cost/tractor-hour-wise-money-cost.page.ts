import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { LoadingService } from 'src/app/shared/srv/loading.service';
import { FuelCostStorageService } from 'src/app/shared/srv/fuel-cost-storage.service';
import { UtilService } from 'src/app/shared/srv/util.service';
import { FuelCostRecord } from 'src/app/models/fuel-cost-record.model';

@Component({
  selector: 'app-tractor-hour-wise-money-cost',
  templateUrl: './tractor-hour-wise-money-cost.page.html',
  styleUrls: ['./tractor-hour-wise-money-cost.page.scss'],
})
export class TractorHourWiseMoneyCostPage {
  hourlyRate: number = 0;
  totalHours: string = '';
  bonusAmount: number = 0;
  totalCost: number | null = null;

  constructor(
    public adsService: AdsService,
    public loadingService: LoadingService,
    private router: Router,
    private fuelCostStorage: FuelCostStorageService,
    public utilService: UtilService,
    private navCtrl: NavController
  ) { }

  goBack() {
    this.router.navigate(['/tractor-fuel-calculator']);
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

  calculateHourWiseCost() {
    if (this.hourlyRate && this.totalHours) {
      this.adsService.showAdMobInterstitialAd();
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

        // Calculate per minute rate
        const perMinuteRate = this.hourlyRate / 60;

        // Calculate total cost
        const baseCost = perMinuteRate * totalMinutes;
        this.totalCost = baseCost + (this.bonusAmount || 0);
        this.loadingService.stopLoader();
      }, 3000);
    }
  }

  async saveRecord() {
    // this.adsService.showAdMobInterstitialAd();
    if (this.totalCost !== null) {
      const record: FuelCostRecord = {
        totalCost: this.totalCost,
        fuelType: "TRACTOR",
        date: new Date().toISOString(),
        calculationType: 'HOUR_WISE_COST',
        hourlyRate: this.hourlyRate,
        totalHours: parseFloat(this.totalHours) || 0,
        title: 'TRACTOR_HOUR_WISE_MONEY_COST_CALCULATION',
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
    this.hourlyRate = 0;
    this.totalHours = '';
    this.bonusAmount = 0;
    this.totalCost = null;
  }
}
