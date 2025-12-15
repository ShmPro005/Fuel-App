import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { LoadingService } from 'src/app/shared/srv/loading.service';
import { FuelCostStorageService } from 'src/app/shared/srv/fuel-cost-storage.service';
import { UtilService } from 'src/app/shared/srv/util.service';
import { FuelCostRecord } from 'src/app/models/fuel-cost-record.model';

@Component({
  selector: 'app-jcb-worked-hours',
  templateUrl: './jcb-worked-hours.page.html',
  styleUrls: ['./jcb-worked-hours.page.scss'],
})
export class JcbWorkedHoursPage {
  startTime: string = '';
  endTime: string = '';
  breakTime: number = 0;
  totalWorkedHours: string | null = null;

  constructor(
    public adsService: AdsService,
    public loadingService: LoadingService,
    private router: Router,
    private translateService: TranslateService,
    private fuelCostStorage: FuelCostStorageService,
    public utilService: UtilService,
    private navCtrl: NavController
  ) { }

  goBack() {
    this.router.navigate(['tabs/jcb-fuel-calculator']);
  }

  calculateWorkedHours() {
    if (this.startTime && this.endTime) {
      // this.adsService.showAdMobInterstitialAd();
      setTimeout(() => {
        const start = new Date(`1970-01-01T${this.startTime}:00`);
        const end = new Date(`1970-01-01T${this.endTime}:00`);

        let diffMs = end.getTime() - start.getTime();

        // If end time is before start time, assume it's the next day
        if (diffMs < 0) {
          diffMs += 24 * 60 * 60 * 1000; // Add 24 hours
        }

        // Convert to hours
        let totalHours = diffMs / (1000 * 60 * 60);

        // Subtract break time
        if (this.breakTime) {
          totalHours -= this.breakTime / 60;
        }

        totalHours = Math.max(0, totalHours);

        // Format as "X hours Y minutes" using translated strings
        const hours = Math.floor(totalHours);
        const minutes = Math.round((totalHours - hours) * 60);

        const hoursText = this.translateService.instant('HOURS');
        const minutesText = this.translateService.instant('MINUTES');

        if (hours === 0 && minutes === 0) {
          this.totalWorkedHours = `0 ${minutesText}`;
        } else if (hours === 0) {
          this.totalWorkedHours = `${minutes} ${minutesText}`;
        } else if (minutes === 0) {
          this.totalWorkedHours = `${hours} ${hoursText}`;
        } else {
          this.totalWorkedHours = `${hours} ${hoursText} ${minutes} ${minutesText}`;
        }
        this.loadingService.stopLoader();
      }, 3000);
    }
  }

  async saveRecord() {
    this.adsService.showAdMobInterstitialAd();
    if (this.totalWorkedHours !== null) {
      const record: FuelCostRecord = {
        startTime: this.startTime,
        endTime: this.endTime,
        breakTime: this.breakTime,
        totalWorkedHours: this.totalWorkedHours,
        fuelType: "JCB",
        date: new Date().toISOString(),
        totalCost: 0, // Not applicable for worked hours
        calculationType: 'WORKED_HOURS',
        title: 'JCB_WORKED_HOURS_CALCULATION',
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
    this.startTime = '';
    this.endTime = '';
    this.breakTime = 0;
    this.totalWorkedHours = null;
  }
}
