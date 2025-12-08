import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TractorFeraCostPage } from './tractor-fera-cost.page';

const routes: Routes = [
  {
    path: '',
    component: TractorFeraCostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TractorFeraCostPageRoutingModule {}
