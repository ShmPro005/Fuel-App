import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TractorHistoryPageRoutingModule } from './tractor-history-routing.module';

import { TractorHistoryPage } from './tractor-history.page';
import { SharedModule } from 'src/app/shared/shared-module/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TractorHistoryPageRoutingModule
  ],
  declarations: [TractorHistoryPage]
})
export class TractorHistoryPageModule {}
