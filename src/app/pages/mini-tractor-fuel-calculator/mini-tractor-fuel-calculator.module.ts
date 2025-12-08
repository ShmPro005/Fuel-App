import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiniTractorFuelCalculatorPageRoutingModule } from './mini-tractor-fuel-calculator-routing.module';

import { MiniTractorFuelCalculatorPage } from './mini-tractor-fuel-calculator.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MiniTractorFuelCalculatorPageRoutingModule
  ],
  declarations: [MiniTractorFuelCalculatorPage]
})
export class MiniTractorFuelCalculatorPageModule {}
