import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiniTractorFeraCostPage } from './mini-tractor-fera-cost.page';

const routes: Routes = [
  {
    path: '',
    component: MiniTractorFeraCostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiniTractorFeraCostPageRoutingModule {}
