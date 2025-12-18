import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RangeCalculatorHistoryPage } from './range-calculator-history.page';

const routes: Routes = [
  {
    path: '',
    component: RangeCalculatorHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RangeCalculatorHistoryPageRoutingModule {}
