import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { LoadingService } from 'src/app/shared/srv/loading.service';
import { FuelCostStorageService } from 'src/app/shared/srv/fuel-cost-storage.service';
import { UtilService } from 'src/app/shared/srv/util.service';
import { FuelCostRecord } from 'src/app/models/fuel-cost-record.model';

@Component({
  selector: 'app-time-calculator',
  templateUrl: './time-calculator.page.html',
  styleUrls: ['./time-calculator.page.scss'],
})
export class TimeCalculatorPage {
  distance: any;
  speed: any;
  hours: any = null;
  minutes: any;
  seconds: any;

  constructor(
    public adsService: AdsService,
    public loadingService: LoadingService,
    private fuelCostStorage: FuelCostStorageService,
    public utilService: UtilService,
    private navCtrl: NavController
  ) {}

  calculateTime() {
    if (this.distance && this.speed) {
      this.adsService.showAdMobInterstitialAd();
      setTimeout(() => {
        const timeInHours = this.distance / this.speed;
        this.hours = Math.floor(timeInHours);
        const timeInMinutes = (timeInHours - this.hours) * 60;
        this.minutes = Math.floor(timeInMinutes);
        this.seconds = Math.floor((timeInMinutes - this.minutes) * 60);
        this.loadingService.stopLoader();
      }, 3000);
   
    }
  }

goBack() {
    window.history.back();
 }

  async saveRecord() {
    // this.adsService.showAdMobInterstitialAd();
    if (this.hours !== null) {
      const fuelType = localStorage.getItem("selectedFuel") || "PETROL";
      const record: FuelCostRecord = {
        distance: this.distance,
        average: this.speed,
        hours: this.hours,
        minutes: this.minutes,
        seconds: this.seconds,
        fuelType: fuelType,
        date: new Date().toISOString(),
        totalCost: 0, // Not applicable for time calculator
        calculationType: 'TIME_CALCULATOR',
        title: 'CALCULATE_DISTANCE_TIME',
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
    this.distance = null;
    this.speed = null;
    this.hours = null;
    this.minutes = null;
    this.seconds = null;
  }
}
