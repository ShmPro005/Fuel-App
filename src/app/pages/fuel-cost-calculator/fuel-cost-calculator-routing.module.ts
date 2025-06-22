import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuelCostCalculatorPage } from './fuel-cost-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: FuelCostCalculatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuelCostCalculatorPageRoutingModule {}
