import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechnicialPage } from './technicial.page';

const routes: Routes = [
  {
    path: '',
    component: TechnicialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechnicialPageRoutingModule {}
