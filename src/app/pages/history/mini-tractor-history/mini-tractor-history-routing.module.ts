import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiniTractorHistoryPage } from './mini-tractor-history.page';

const routes: Routes = [
  {
    path: '',
    component: MiniTractorHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiniTractorHistoryPageRoutingModule {}
