import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuelCostCalculatorPageRoutingModule } from './fuel-cost-calculator-routing.module';

import { FuelCostCalculatorPage } from './fuel-cost-calculator.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FuelCostCalculatorPageRoutingModule
  ],
  declarations: [FuelCostCalculatorPage]
})
export class FuelCostCalculatorPageModule {}
