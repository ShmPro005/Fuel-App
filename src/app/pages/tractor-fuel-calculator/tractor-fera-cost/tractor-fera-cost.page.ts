import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { LoadingService } from 'src/app/shared/srv/loading.service';

@Component({
  selector: 'app-tractor-fera-cost',
  templateUrl: './tractor-fera-cost.page.html',
  styleUrls: ['./tractor-fera-cost.page.scss'],
})
export class TractorFeraCostPage {
  distanceKm: number = 0;
  costPerKm: number = 0;
  additionalCharges: number = 0;
  totalCost: number | null = null;

  constructor(
    public adsService: AdsService,
    public loadingService: LoadingService,
    private router: Router
  ) { }

  goBack() {
    this.router.navigate(['/tractor-fuel-calculator']);
  }

  calculateFeraCost() {
    if (this.distanceKm && this.costPerKm) {
      this.adsService.showAdMobInterstitialAd();
      setTimeout(() => {
        const baseCost = this.distanceKm * this.costPerKm;
        this.totalCost = baseCost + (this.additionalCharges || 0);
        this.loadingService.stopLoader();
      }, 3000);
    }
  }
}
