import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentsClientsPage } from './appointments-clients.page';

const routes: Routes = [
  {
    path: '',
    component: AppointmentsClientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentsClientsPageRoutingModule {}
