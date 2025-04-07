import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendancesPage } from './attendances.page';

const routes: Routes = [
  {
    path: '',
    component: AttendancesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendancesPageRoutingModule {}
