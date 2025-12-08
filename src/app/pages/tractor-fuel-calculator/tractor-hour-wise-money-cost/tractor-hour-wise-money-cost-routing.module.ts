import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TractorHourWiseMoneyCostPage } from './tractor-hour-wise-money-cost.page';

const routes: Routes = [
  {
    path: '',
    component: TractorHourWiseMoneyCostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TractorHourWiseMoneyCostPageRoutingModule {}
