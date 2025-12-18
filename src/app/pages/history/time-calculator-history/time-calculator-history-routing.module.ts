import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeCalculatorHistoryPage } from './time-calculator-history.page';

const routes: Routes = [
  {
    path: '',
    component: TimeCalculatorHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeCalculatorHistoryPageRoutingModule {}
