import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JcbFeraCostPage } from './jcb-fera-cost.page';

const routes: Routes = [
  {
    path: '',
    component: JcbFeraCostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JcbFeraCostPageRoutingModule {}
