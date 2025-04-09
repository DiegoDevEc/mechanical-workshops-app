import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardTechnicianPageRoutingModule } from './dashboard-technician-routing.module';

import { DashboardTechnicianPage } from './dashboard-technician.page';
import { MenuTechnicianComponent } from 'src/app/shared/menu-technician/menu-technician.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuTechnicianComponent,
    DashboardTechnicianPageRoutingModule
  ],
  declarations: [DashboardTechnicianPage]
})
export class DashboardTechnicianPageModule {}
