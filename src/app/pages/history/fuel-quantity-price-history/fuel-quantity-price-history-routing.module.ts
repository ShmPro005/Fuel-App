import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuelQuantityPriceHistoryPage } from './fuel-quantity-price-history.page';

const routes: Routes = [
  {
    path: '',
    component: FuelQuantityPriceHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuelQuantityPriceHistoryPageRoutingModule {}
