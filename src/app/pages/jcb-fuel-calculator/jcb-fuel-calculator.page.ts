import { Component } from '@angular/core';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { LoadingService } from 'src/app/shared/srv/loading.service';

@Component({
  selector: 'app-jcb-fuel-calculator',
  templateUrl: './jcb-fuel-calculator.page.html',
  styleUrls: ['./jcb-fuel-calculator.page.scss'],
})
export class JcbFuelCalculatorPage {
  fuelAvgPerHour: any;
  fuelPrice: any;
  totalHours: any;
  totalCost: any = null;

  constructor( public adsService: AdsService, public loadingService: LoadingService) { }

  calculateJcbFuelCost() {
    if (this.fuelAvgPerHour && this.fuelPrice && this.totalHours) {
      this.adsService.showAdMobInterstitialAd();
      setTimeout(() => {
        const fuelNeeded = this.fuelAvgPerHour * this.totalHours;
        this.totalCost = fuelNeeded * this.fuelPrice;
        this.loadingService.stopLoader();
      }, 3000);

    }
  }
}
