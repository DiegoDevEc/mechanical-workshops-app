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
        path: 'administrators',
        loadChildren: () => import('./pages/administrators/administrators.module').then( m => m.AdministratorsPageModule)
      },
      {
        path: 'technician',
        loadChildren: () => import('./pages/technicial/technicial.module').then( m => m.TechnicialPageModule)
      },
      {
        path: 'appointments',
        loadChildren: () => import('./pages/appointments/appointments.module').then( m => m.AppointmentsPageModule)
      },
      {
        path: 'services',
        loadChildren: () => import('./pages/services-page/services.module').then( m => m.ServicesPageModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsPageModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
      },
      {
        path: 'clients',
        loadChildren: () => import('./pages/clients/clients.module').then( m => m.ClientsPageModule)
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
