import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimeCalculatorHistoryPageRoutingModule } from './time-calculator-history-routing.module';

import { TimeCalculatorHistoryPage } from './time-calculator-history.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TimeCalculatorHistoryPageRoutingModule
  ],
  declarations: [TimeCalculatorHistoryPage]
})
export class TimeCalculatorHistoryPageModule {}
