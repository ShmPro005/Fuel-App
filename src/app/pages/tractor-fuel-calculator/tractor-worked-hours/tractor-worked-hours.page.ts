import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { LoadingService } from 'src/app/shared/srv/loading.service';
import { FuelCostStorageService } from 'src/app/shared/srv/fuel-cost-storage.service';
import { SaveDataService } from 'src/app/shared/srv/save-data.service';
import { UtilService } from 'src/app/shared/srv/util.service';
import { FuelCostRecord } from 'src/app/models/fuel-cost-record.model';

@Component({
  selector: 'app-tractor-worked-hours',
  templateUrl: './tractor-worked-hours.page.html',
  styleUrls: ['./tractor-worked-hours.page.scss'],
})
export class TractorWorkedHoursPage {
  startTime: string = '';
  endTime: string = '';
  breakTime: number = 0;
  totalWorkedHours: any | null = null;
  totalWorkedHoursNumeric: number = 0;

  constructor(
    public adsService: AdsService,
    public loadingService: LoadingService,
    private router: Router,
    private translateService: TranslateService,
    private fuelCostStorage: FuelCostStorageService,
    private saveDataService: SaveDataService,
    public utilService: UtilService,
    private navCtrl: NavController
  ) { }

  goBack() {
    this.router.navigate(['/tractor-fuel-calculator']);
  }

  calculateWorkedHours() {
    if (this.startTime && this.endTime) {
      this.adsService.showAdMobInterstitialAd();
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
        this.totalWorkedHoursNumeric = totalHours;

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
    // this.adsService.showAdMobInterstitialAd();
    if (this.totalWorkedHours !== null) {
      const record: FuelCostRecord = {
        totalCost: this.totalWorkedHoursNumeric,
        fuelType: "TRACTOR",
        date: new Date().toISOString(),
        calculationType: 'WORKED_HOURS',
        startTime: this.startTime,
        endTime: this.endTime,
        breakTime: this.breakTime,
        totalWorkedHours: this.totalWorkedHours,
        title: 'TRACTOR_WORKED_HOURS_CALCULATION',
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
    this.startTime = '';
    this.endTime = '';
    this.breakTime = 0;
    this.totalWorkedHours = null;
    this.totalWorkedHoursNumeric = 0;
  }
}
