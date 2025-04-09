import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentsClientsPageRoutingModule } from './appointments-clients-routing.module';

import { AppointmentsClientsPage } from './appointments-clients.page';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { DateTimeSelectionComponent } from './components/date-time-selection/date-time-selection.component';
import { ServiceSelectionComponent } from './components/service-selection/service-selection.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { VehiculeSelectionComponent } from './components/vehicule-selection/vehicule-selection.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderComponent,
    DateTimeSelectionComponent,
    ServiceSelectionComponent,
    ConfirmationComponent,
    VehiculeSelectionComponent,
    AppointmentsClientsPageRoutingModule
  ],
  declarations: [AppointmentsClientsPage]
})
export class AppointmentsClientsPageModule {}
