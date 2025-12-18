import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuelQuantityCalculatorHistoryPage } from './fuel-quantity-calculator-history.page';

const routes: Routes = [
  {
    path: '',
    component: FuelQuantityCalculatorHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuelQuantityCalculatorHistoryPageRoutingModule {}
