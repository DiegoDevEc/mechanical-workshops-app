import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendancesClientsPage } from './attendances-clients.page';

const routes: Routes = [
  {
    path: '',
    component: AttendancesClientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendancesClientsPageRoutingModule {}
