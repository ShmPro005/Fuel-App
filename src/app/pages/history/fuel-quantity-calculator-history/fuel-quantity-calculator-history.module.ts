import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuelQuantityCalculatorHistoryPageRoutingModule } from './fuel-quantity-calculator-history-routing.module';

import { FuelQuantityCalculatorHistoryPage } from './fuel-quantity-calculator-history.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FuelQuantityCalculatorHistoryPageRoutingModule
  ],
  declarations: [FuelQuantityCalculatorHistoryPage]
})
export class FuelQuantityCalculatorHistoryPageModule {}
