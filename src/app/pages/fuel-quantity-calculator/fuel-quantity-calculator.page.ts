import { Component } from '@angular/core';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { LoadingService } from 'src/app/shared/srv/loading.service';

@Component({
  selector: 'app-fuel-quantity-calculator',
  templateUrl: './fuel-quantity-calculator.page.html',
  styleUrls: ['./fuel-quantity-calculator.page.scss'],
})
export class FuelQuantityCalculatorPage {
  totalFuelPrice: any;
  fuelPrice: any;
  liters: any = null;

  constructor( public adsService: AdsService, public loadingService: LoadingService) { }

  calculateFuelQuantity() {
    if (this.totalFuelPrice && this.fuelPrice) {
      this.adsService.showAdMobInterstitialAd();
      setTimeout(() => {
      this.liters = this.totalFuelPrice / this.fuelPrice;
      this.loadingService.stopLoader
      }, 3000);
    }else {
      this.liters = null;
    }
  }
}
