import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TractorFuelCalculatorPage } from './tractor-fuel-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: TractorFuelCalculatorPage
  },
  {
    path: 'tractor-fuel-cost',
    loadChildren: () => import('./tractor-fuel-cost/tractor-fuel-cost.module').then( m => m.TractorFuelCostPageModule)
  },
  {
    path: 'tractor-worked-hours',
    loadChildren: () => import('./tractor-worked-hours/tractor-worked-hours.module').then( m => m.TractorWorkedHoursPageModule)
  },
  {
    path: 'tractor-hour-wise-money-cost',
    loadChildren: () => import('./tractor-hour-wise-money-cost/tractor-hour-wise-money-cost.module').then( m => m.TractorHourWiseMoneyCostPageModule)
  },
  {
    path: 'tractor-fera-cost',
    loadChildren: () => import('./tractor-fera-cost/tractor-fera-cost.module').then( m => m.TractorFeraCostPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TractorFuelCalculatorPageRoutingModule {}
