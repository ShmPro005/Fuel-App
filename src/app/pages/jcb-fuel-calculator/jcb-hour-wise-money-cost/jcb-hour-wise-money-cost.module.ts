import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JcbHourWiseMoneyCostPageRoutingModule } from './jcb-hour-wise-money-cost-routing.module';

import { JcbHourWiseMoneyCostPage } from './jcb-hour-wise-money-cost.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    JcbHourWiseMoneyCostPageRoutingModule
  ],
  declarations: [JcbHourWiseMoneyCostPage]
})
export class JcbHourWiseMoneyCostPageModule {}
