import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeTechnicianPageRoutingModule } from './home-technician-routing.module';

import { HomeTechnicianPage } from './home-technician.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeTechnicianPageRoutingModule
  ],
  declarations: [HomeTechnicianPage]
})
export class HomeTechnicianPageModule {}
