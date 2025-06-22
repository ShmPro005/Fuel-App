import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TractorFuelCalculatorPageRoutingModule } from './tractor-fuel-calculator-routing.module';

import { TractorFuelCalculatorPage } from './tractor-fuel-calculator.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TractorFuelCalculatorPageRoutingModule
  ],
  declarations: [TractorFuelCalculatorPage]
})
export class TractorFuelCalculatorPageModule {}
