import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarHistoryPage } from './car-history.page';

const routes: Routes = [
  {
    path: '',
    component: CarHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarHistoryPageRoutingModule {}
