import { Component, OnInit } from '@angular/core';
import { AdsService } from 'src/app/shared/srv/ads.service';
import { LoadingService } from 'src/app/shared/srv/loading.service';

@Component({
  selector: 'app-fuel-quantity-price',
  templateUrl: './fuel-quantity-price.page.html',
  styleUrls: ['./fuel-quantity-price.page.scss'],
})
export class FuelQuantityPricePage implements OnInit {
  fuelQuantity: any = '';
  fuelPrice: any = '';
  totalCost: number | null = null;


  constructor( public adsService : AdsService, public loadingService: LoadingService) { }

  ngOnInit() {
  }


  calculateTotalCost() {
    if (this.fuelQuantity && this.fuelPrice) {
      this.adsService.showAdMobInterstitialAd();
      setTimeout(() => {
      this.totalCost = this.fuelQuantity * this.fuelPrice;
      this.loadingService.stopLoader();
      }, 3000);
    } else {
      this.totalCost = null;
    }
  }
}
