import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeTechnicianPage } from './home-technician.page';

const routes: Routes = [
  {
    path: '',
    component: HomeTechnicianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeTechnicianPageRoutingModule {}
