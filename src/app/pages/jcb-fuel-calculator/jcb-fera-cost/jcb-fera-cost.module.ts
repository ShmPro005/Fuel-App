import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JcbFeraCostPageRoutingModule } from './jcb-fera-cost-routing.module';

import { JcbFeraCostPage } from './jcb-fera-cost.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    JcbFeraCostPageRoutingModule
  ],
  declarations: [JcbFeraCostPage]
})
export class JcbFeraCostPageModule {}
