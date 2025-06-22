import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuelQuantityCalculatorPage } from './fuel-quantity-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: FuelQuantityCalculatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuelQuantityCalculatorPageRoutingModule {}
