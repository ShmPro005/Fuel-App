import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuelQuantityPricePageRoutingModule } from './fuel-quantity-price-routing.module';

import { FuelQuantityPricePage } from './fuel-quantity-price.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FuelQuantityPricePageRoutingModule
  ],
  declarations: [FuelQuantityPricePage]
})
export class FuelQuantityPricePageModule {}
