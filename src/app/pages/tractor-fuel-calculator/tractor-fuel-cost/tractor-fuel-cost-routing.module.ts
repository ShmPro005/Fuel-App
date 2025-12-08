import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TractorFuelCostPage } from './tractor-fuel-cost.page';

const routes: Routes = [
  {
    path: '',
    component: TractorFuelCostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TractorFuelCostPageRoutingModule {}
