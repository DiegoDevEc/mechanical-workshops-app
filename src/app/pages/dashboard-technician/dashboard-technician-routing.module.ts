//import { HomeTechnicianComponent } from './pages/home-technician/home-technician.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardTechnicianPage } from './dashboard-technician.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardTechnicianPage,
    children: [
      {
        path: 'home-technician',
        loadChildren: () => import('./pages/home-technician/home-technician.module').then( m => m.HomeTechnicianPageModule)
      },
      {
        path: 'attendances-technician',
        loadChildren: () => import('./pages/attendances/attendances.module').then( m => m.AttendancesPageModule)
      },
      { path: '', redirectTo: 'home-technician', pathMatch: 'full' },
      { path: '**', redirectTo: '' }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardTechnicianPageRoutingModule {}
