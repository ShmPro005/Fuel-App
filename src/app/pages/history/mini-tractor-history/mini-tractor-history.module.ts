import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiniTractorHistoryPageRoutingModule } from './mini-tractor-history-routing.module';

import { MiniTractorHistoryPage } from './mini-tractor-history.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MiniTractorHistoryPageRoutingModule
  ],
  declarations: [MiniTractorHistoryPage]
})
export class MiniTractorHistoryPageModule {}
