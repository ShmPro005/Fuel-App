import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RangeCalculatorHistoryPageRoutingModule } from './range-calculator-history-routing.module';

import { RangeCalculatorHistoryPage } from './range-calculator-history.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RangeCalculatorHistoryPageRoutingModule
  ],
  declarations: [RangeCalculatorHistoryPage]
})
export class RangeCalculatorHistoryPageModule {}
