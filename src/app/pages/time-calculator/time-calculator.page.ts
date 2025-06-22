import { Component } from '@angular/core';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { LoadingService } from 'src/app/shared/srv/loading.service';

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

  constructor(public adsService: AdsService, public loadingService: LoadingService) {}

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
}
