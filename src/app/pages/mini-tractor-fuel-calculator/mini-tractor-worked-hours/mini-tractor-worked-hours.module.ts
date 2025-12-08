import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiniTractorWorkedHoursPageRoutingModule } from './mini-tractor-worked-hours-routing.module';

import { MiniTractorWorkedHoursPage } from './mini-tractor-worked-hours.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MiniTractorWorkedHoursPageRoutingModule
  ],
  declarations: [MiniTractorWorkedHoursPage]
})
export class MiniTractorWorkedHoursPageModule {}
