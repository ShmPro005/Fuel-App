import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { LoadingService } from 'src/app/shared/srv/loading.service';

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
    private router: Router
  ) { }

  goBack() {
    this.router.navigate(['/mini-tractor-fuel-calculator']);
  }

  calculateMiniTractorFuelCost() {
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
