import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeClientsPage } from './home-clients.page';

const routes: Routes = [
  {
    path: '',
    component: HomeClientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeClientsPageRoutingModule {}
