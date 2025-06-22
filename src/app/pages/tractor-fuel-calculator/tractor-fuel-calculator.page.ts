import { Component } from '@angular/core';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { LoadingService } from 'src/app/shared/srv/loading.service';

@Component({
  selector: 'app-tractor-fuel-calculator',
  templateUrl: './tractor-fuel-calculator.page.html',
  styleUrls: ['./tractor-fuel-calculator.page.scss'],
})
export class TractorFuelCalculatorPage {
  fuelAvgPerHour: any;
  fuelPrice: any;
  totalHours: any;
  totalCost: any = null;

  constructor( public adsService: AdsService, public loadingService: LoadingService) { }

  calculateTractorFuelCost() {
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
