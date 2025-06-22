import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeCalculatorPage } from './time-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: TimeCalculatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeCalculatorPageRoutingModule {}
