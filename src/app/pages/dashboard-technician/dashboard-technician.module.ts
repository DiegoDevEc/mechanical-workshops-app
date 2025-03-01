import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardTechnicianPageRoutingModule } from './dashboard-technician-routing.module';

import { DashboardTechnicianPage } from './dashboard-technician.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardTechnicianPageRoutingModule
  ],
  declarations: [DashboardTechnicianPage]
})
export class DashboardTechnicianPageModule {}
