import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardTechnicianPage } from './dashboard-technician.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardTechnicianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardTechnicianPageRoutingModule {}
