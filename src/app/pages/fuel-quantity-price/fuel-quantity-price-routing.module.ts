import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuelQuantityPricePage } from './fuel-quantity-price.page';

const routes: Routes = [
  {
    path: '',
    component: FuelQuantityPricePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuelQuantityPricePageRoutingModule {}
