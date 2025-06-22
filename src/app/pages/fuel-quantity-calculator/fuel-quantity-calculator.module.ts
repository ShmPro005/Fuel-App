import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuelQuantityCalculatorPageRoutingModule } from './fuel-quantity-calculator-routing.module';

import { FuelQuantityCalculatorPage } from './fuel-quantity-calculator.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FuelQuantityCalculatorPageRoutingModule
  ],
  declarations: [FuelQuantityCalculatorPage]
})
export class FuelQuantityCalculatorPageModule {}
