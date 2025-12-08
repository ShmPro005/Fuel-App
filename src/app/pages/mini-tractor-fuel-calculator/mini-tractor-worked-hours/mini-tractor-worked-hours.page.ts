import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { LoadingService } from 'src/app/shared/srv/loading.service';

@Component({
  selector: 'app-mini-tractor-worked-hours',
  templateUrl: './mini-tractor-worked-hours.page.html',
  styleUrls: ['./mini-tractor-worked-hours.page.scss'],
})
export class MiniTractorWorkedHoursPage {
  startTime: string = '';
  endTime: string = '';
  breakTime: number = 0;
  totalWorkedHours: any | null = null;

  constructor(
    public adsService: AdsService,
    public loadingService: LoadingService,
    private router: Router,
    private translateService: TranslateService
    
  ) { }

  goBack() {
    this.router.navigate(['/mini-tractor-fuel-calculator']);
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
}
