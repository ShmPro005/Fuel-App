import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { LoadingService } from 'src/app/shared/srv/loading.service';

@Component({
  selector: 'app-tractor-fuel-cost',
  templateUrl: './tractor-fuel-cost.page.html',
  styleUrls: ['./tractor-fuel-cost.page.scss'],
})
export class TractorFuelCostPage {
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
    this.router.navigate(['/tractor-fuel-calculator']);
  }

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
