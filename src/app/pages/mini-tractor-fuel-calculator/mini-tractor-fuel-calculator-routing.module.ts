import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiniTractorFuelCalculatorPage } from './mini-tractor-fuel-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: MiniTractorFuelCalculatorPage
  },
  {
    path: 'mini-tractor-fuel-cost',
    loadChildren: () => import('./mini-tractor-fuel-cost/mini-tractor-fuel-cost.module').then( m => m.MiniTractorFuelCostPageModule)
  },
  {
    path: 'mini-tractor-worked-hours',
    loadChildren: () => import('./mini-tractor-worked-hours/mini-tractor-worked-hours.module').then( m => m.MiniTractorWorkedHoursPageModule)
  },
  {
    path: 'mini-tractor-hour-wise-money-cost',
    loadChildren: () => import('./mini-tractor-hour-wise-money-cost/mini-tractor-hour-wise-money-cost.module').then( m => m.MiniTractorHourWiseMoneyCostPageModule)
  },
  {
    path: 'mini-tractor-fera-cost',
    loadChildren: () => import('./mini-tractor-fera-cost/mini-tractor-fera-cost.module').then( m => m.MiniTractorFeraCostPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiniTractorFuelCalculatorPageRoutingModule {}
