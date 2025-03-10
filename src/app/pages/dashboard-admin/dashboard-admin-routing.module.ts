import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardAdminPage } from './dashboard-admin.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardAdminPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'technicial',
        loadChildren: () => import('./pages/technicial/technicial.module').then( m => m.TechnicialPageModule)
      },
      {
        path: 'administrators',
        loadChildren: () => import('./pages/administrators/administrators.module').then( m => m.AdministratorsPageModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsPageModule)
      },
      {
        path: 'appointments',
        loadChildren: () => import('./pages/appointments/appointments.module').then( m => m.AppointmentsPageModule)
      },
      {
        path: 'form-administrator',
        loadChildren: () => import('./pages/form-administrator/form-administrator.module').then( m => m.FormAdministratorPageModule)
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: '' }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardAdminPageRoutingModule {}
