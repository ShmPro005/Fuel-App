import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TractorWorkedHoursPage } from './tractor-worked-hours.page';

const routes: Routes = [
  {
    path: '',
    component: TractorWorkedHoursPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TractorWorkedHoursPageRoutingModule {}
