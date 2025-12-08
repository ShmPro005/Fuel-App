import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JcbFuelCostPageRoutingModule } from './jcb-fuel-cost-routing.module';

import { JcbFuelCostPage } from './jcb-fuel-cost.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    JcbFuelCostPageRoutingModule
  ],
  declarations: [JcbFuelCostPage]
})
export class JcbFuelCostPageModule {}
