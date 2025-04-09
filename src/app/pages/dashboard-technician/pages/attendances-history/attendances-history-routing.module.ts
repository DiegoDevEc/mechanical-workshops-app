import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendancesHistoryPage } from './attendances-history.page';

const routes: Routes = [
  {
    path: '',
    component: AttendancesHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendancesHistoryPageRoutingModule {}
