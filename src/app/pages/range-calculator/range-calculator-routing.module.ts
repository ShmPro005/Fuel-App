import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RangeCalculatorPage } from './range-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: RangeCalculatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RangeCalculatorPageRoutingModule {}
