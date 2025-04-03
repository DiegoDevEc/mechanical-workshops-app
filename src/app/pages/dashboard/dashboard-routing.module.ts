import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'home-clients',
        loadChildren: () => import('./pages/home-clients/home-clients.module').then( m => m.HomeClientsPageModule)
      },
      {
        path: 'appointments-clients',
        loadChildren: () => import('./pages/appointments-clients/appointments-clients.module').then( m => m.AppointmentsClientsPageModule)
      },
      {
        path: 'attendances-clients',
        loadChildren: () => import('./pages/attendances-clients/attendances-clients.module').then( m => m.AttendancesClientsPageModule)
      },
      { path: '', redirectTo: 'home-clients', pathMatch: 'full' },
      { path: '**', redirectTo: '' }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
