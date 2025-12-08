import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiniTractorHourWiseMoneyCostPageRoutingModule } from './mini-tractor-hour-wise-money-cost-routing.module';

import { MiniTractorHourWiseMoneyCostPage } from './mini-tractor-hour-wise-money-cost.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MiniTractorHourWiseMoneyCostPageRoutingModule
  ],
  declarations: [MiniTractorHourWiseMoneyCostPage]
})
export class MiniTractorHourWiseMoneyCostPageModule {}
