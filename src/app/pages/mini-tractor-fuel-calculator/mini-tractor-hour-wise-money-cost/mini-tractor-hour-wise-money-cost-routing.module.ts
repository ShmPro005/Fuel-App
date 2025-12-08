import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiniTractorHourWiseMoneyCostPage } from './mini-tractor-hour-wise-money-cost.page';

const routes: Routes = [
  {
    path: '',
    component: MiniTractorHourWiseMoneyCostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiniTractorHourWiseMoneyCostPageRoutingModule {}
