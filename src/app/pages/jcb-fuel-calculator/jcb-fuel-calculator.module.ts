import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JcbFuelCalculatorPageRoutingModule } from './jcb-fuel-calculator-routing.module';

import { JcbFuelCalculatorPage } from './jcb-fuel-calculator.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    JcbFuelCalculatorPageRoutingModule
  ],
  declarations: [JcbFuelCalculatorPage]
})
export class JcbFuelCalculatorPageModule {}
