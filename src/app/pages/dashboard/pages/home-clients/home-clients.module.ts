import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeClientsPageRoutingModule } from './home-clients-routing.module';

import { HomeClientsPage } from './home-clients.page';
import { HeaderComponent } from 'src/app/shared/header/header.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderComponent,
    HomeClientsPageRoutingModule
  ],
  declarations: [HomeClientsPage]
})
export class HomeClientsPageModule {}
