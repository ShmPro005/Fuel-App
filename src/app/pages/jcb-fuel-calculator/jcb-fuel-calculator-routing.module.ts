import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JcbFuelCalculatorPage } from './jcb-fuel-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: JcbFuelCalculatorPage
  },  {
    path: 'jcb-fuel-cost',
    loadChildren: () => import('./jcb-fuel-cost/jcb-fuel-cost.module').then( m => m.JcbFuelCostPageModule)
  },
  {
    path: 'jcb-worked-hours',
    loadChildren: () => import('./jcb-worked-hours/jcb-worked-hours.module').then( m => m.JcbWorkedHoursPageModule)
  },
  {
    path: 'jcb-hour-wise-money-cost',
    loadChildren: () => import('./jcb-hour-wise-money-cost/jcb-hour-wise-money-cost.module').then( m => m.JcbHourWiseMoneyCostPageModule)
  },
  {
    path: 'jcb-fera-cost',
    loadChildren: () => import('./jcb-fera-cost/jcb-fera-cost.module').then( m => m.JcbFeraCostPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JcbFuelCalculatorPageRoutingModule {}
