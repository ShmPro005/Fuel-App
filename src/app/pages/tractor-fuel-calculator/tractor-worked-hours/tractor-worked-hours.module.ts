import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TractorWorkedHoursPageRoutingModule } from './tractor-worked-hours-routing.module';

import { TractorWorkedHoursPage } from './tractor-worked-hours.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TractorWorkedHoursPageRoutingModule
  ],
  declarations: [TractorWorkedHoursPage]
})
export class TractorWorkedHoursPageModule {}
