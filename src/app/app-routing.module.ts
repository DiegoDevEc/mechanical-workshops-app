import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'CLIENT' }
  },
  {
    path: 'dashboard-admin',
    loadChildren: () => import('./pages/dashboard-admin/dashboard-admin.module').then(m => m.DashboardAdminPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'ADMINISTRATOR' }
  },
  {
    path: 'dashboard-technician',
    loadChildren: () => import('./pages/dashboard-technician/dashboard-technician.module').then(m => m.DashboardTechnicianPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'TECHNICIAN' }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
