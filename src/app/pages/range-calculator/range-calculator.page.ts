import { Component } from '@angular/core';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { LoadingService } from 'src/app/shared/srv/loading.service';

@Component({
  selector: 'app-range-calculator',
  templateUrl: './range-calculator.page.html',
  styleUrls: ['./range-calculator.page.scss'],
})
export class RangeCalculatorPage {
  fuelAmount: any; // total money spent on fuel
  fuelPrice: any;
  average: any;
  totalRange: any = null;

  constructor(private adsService: AdsService, public loadingService: LoadingService) {}

  calculateRange() {
    if (this.fuelAmount && this.fuelPrice && this.average) {
      this.adsService.showAdMobInterstitialAd();
      setTimeout(() => {
        const litersBought = this.fuelAmount / this.fuelPrice;
        this.totalRange = litersBought * this.average;
        this.loadingService.stopLoader();
      }, 3000);
    }
  }
  goBack() {
    window.history.back();
 }
}
