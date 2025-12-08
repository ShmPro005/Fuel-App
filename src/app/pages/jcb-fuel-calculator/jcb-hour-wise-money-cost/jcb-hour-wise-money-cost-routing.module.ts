import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JcbHourWiseMoneyCostPage } from './jcb-hour-wise-money-cost.page';

const routes: Routes = [
  {
    path: '',
    component: JcbHourWiseMoneyCostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JcbHourWiseMoneyCostPageRoutingModule {}
