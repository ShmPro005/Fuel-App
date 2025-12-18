import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TractorHistoryPage } from './tractor-history.page';

const routes: Routes = [
  {
    path: '',
    component: TractorHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TractorHistoryPageRoutingModule {}
