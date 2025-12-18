import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuelQuantityPriceHistoryPageRoutingModule } from './fuel-quantity-price-history-routing.module';

import { FuelQuantityPriceHistoryPage } from './fuel-quantity-price-history.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FuelQuantityPriceHistoryPageRoutingModule
  ],
  declarations: [FuelQuantityPriceHistoryPage]
})
export class FuelQuantityPriceHistoryPageModule {}
