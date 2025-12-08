import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiniTractorFuelCostPage } from './mini-tractor-fuel-cost.page';

const routes: Routes = [
  {
    path: '',
    component: MiniTractorFuelCostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiniTractorFuelCostPageRoutingModule {}
