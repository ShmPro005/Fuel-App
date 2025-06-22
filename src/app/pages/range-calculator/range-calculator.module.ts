import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RangeCalculatorPageRoutingModule } from './range-calculator-routing.module';

import { RangeCalculatorPage } from './range-calculator.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RangeCalculatorPageRoutingModule
  ],
  declarations: [RangeCalculatorPage]
})
export class RangeCalculatorPageModule {}
