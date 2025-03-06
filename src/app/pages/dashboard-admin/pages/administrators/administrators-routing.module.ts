import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministratorsPage } from './administrators.page';

const routes: Routes = [
  {
    path: '',
    component: AdministratorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratorsPageRoutingModule {}
