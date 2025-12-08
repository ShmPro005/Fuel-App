import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiniTractorFuelCostPageRoutingModule } from './mini-tractor-fuel-cost-routing.module';

import { MiniTractorFuelCostPage } from './mini-tractor-fuel-cost.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MiniTractorFuelCostPageRoutingModule
  ],
  declarations: [MiniTractorFuelCostPage]
})
export class MiniTractorFuelCostPageModule {}
