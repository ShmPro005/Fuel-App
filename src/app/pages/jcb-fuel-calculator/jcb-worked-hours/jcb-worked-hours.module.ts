import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JcbWorkedHoursPageRoutingModule } from './jcb-worked-hours-routing.module';

import { JcbWorkedHoursPage } from './jcb-worked-hours.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    JcbWorkedHoursPageRoutingModule
  ],
  declarations: [JcbWorkedHoursPage]
})
export class JcbWorkedHoursPageModule {}
