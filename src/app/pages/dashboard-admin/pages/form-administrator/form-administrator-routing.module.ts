import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormAdministratorPage } from './form-administrator.page';

const routes: Routes = [
  {
    path: '',
    component: FormAdministratorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormAdministratorPageRoutingModule {}
