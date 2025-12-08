import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TractorFeraCostPageRoutingModule } from './tractor-fera-cost-routing.module';

import { TractorFeraCostPage } from './tractor-fera-cost.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TractorFeraCostPageRoutingModule
  ],
  declarations: [TractorFeraCostPage]
})
export class TractorFeraCostPageModule {}
