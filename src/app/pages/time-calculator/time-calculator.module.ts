import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimeCalculatorPageRoutingModule } from './time-calculator-routing.module';

import { TimeCalculatorPage } from './time-calculator.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TimeCalculatorPageRoutingModule
  ],
  declarations: [TimeCalculatorPage]
})
export class TimeCalculatorPageModule {}
