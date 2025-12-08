import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiniTractorWorkedHoursPage } from './mini-tractor-worked-hours.page';

const routes: Routes = [
  {
    path: '',
    component: MiniTractorWorkedHoursPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiniTractorWorkedHoursPageRoutingModule {}
