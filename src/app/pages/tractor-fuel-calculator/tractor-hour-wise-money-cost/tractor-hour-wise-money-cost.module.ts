import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TractorHourWiseMoneyCostPageRoutingModule } from './tractor-hour-wise-money-cost-routing.module';

import { TractorHourWiseMoneyCostPage } from './tractor-hour-wise-money-cost.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TractorHourWiseMoneyCostPageRoutingModule
  ],
  declarations: [TractorHourWiseMoneyCostPage]
})
export class TractorHourWiseMoneyCostPageModule {}
