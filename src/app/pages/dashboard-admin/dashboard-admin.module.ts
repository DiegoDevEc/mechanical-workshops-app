import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardAdminPageRoutingModule } from './dashboard-admin-routing.module';

import { DashboardAdminPage } from './dashboard-admin.page';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { MenuAdministratorComponent } from "../../shared/menu-administrator/menu-administrator.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderComponent,
    DashboardAdminPageRoutingModule,
    MenuAdministratorComponent
],
  declarations: [DashboardAdminPage]
})
export class DashboardAdminPageModule {}
