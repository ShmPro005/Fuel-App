import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TractorFuelCostPageRoutingModule } from './tractor-fuel-cost-routing.module';

import { TractorFuelCostPage } from './tractor-fuel-cost.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TractorFuelCostPageRoutingModule
  ],
  declarations: [TractorFuelCostPage]
})
export class TractorFuelCostPageModule {}
