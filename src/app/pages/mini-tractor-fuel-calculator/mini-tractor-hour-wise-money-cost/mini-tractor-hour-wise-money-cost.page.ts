import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { LoadingService } from 'src/app/shared/srv/loading.service';

@Component({
  selector: 'app-mini-tractor-hour-wise-money-cost',
  templateUrl: './mini-tractor-hour-wise-money-cost.page.html',
  styleUrls: ['./mini-tractor-hour-wise-money-cost.page.scss'],
})
export class MiniTractorHourWiseMoneyCostPage {
  hourlyRate: number = 0;
  totalHours: number = 0;
  bonusAmount: number = 0;
  totalCost: number | null = null;

  constructor(
    public adsService: AdsService,
    public loadingService: LoadingService,
    private router: Router
  ) { }

  goBack() {
    this.router.navigate(['/mini-tractor-fuel-calculator']);
  }

  calculateHourWiseCost() {
    if (this.hourlyRate && this.totalHours) {
      this.adsService.showAdMobInterstitialAd();
      setTimeout(() => {
        const baseCost = this.hourlyRate * this.totalHours;
        this.totalCost = baseCost + (this.bonusAmount || 0);
        this.loadingService.stopLoader();
      }, 3000);
    }
  }
}
