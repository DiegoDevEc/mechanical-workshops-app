import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendancesClientsPageRoutingModule } from './attendances-clients-routing.module';

import { AttendancesClientsPage } from './attendances-clients.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendancesClientsPageRoutingModule
  ],
  declarations: [AttendancesClientsPage]
})
export class AttendancesClientsPageModule {}
