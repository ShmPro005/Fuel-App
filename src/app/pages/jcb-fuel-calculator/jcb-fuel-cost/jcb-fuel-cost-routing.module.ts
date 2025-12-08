import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JcbFuelCostPage } from './jcb-fuel-cost.page';

const routes: Routes = [
  {
    path: '',
    component: JcbFuelCostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JcbFuelCostPageRoutingModule {}
