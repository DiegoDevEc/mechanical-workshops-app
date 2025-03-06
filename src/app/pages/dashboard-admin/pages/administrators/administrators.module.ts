import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministratorsPageRoutingModule } from './administrators-routing.module';

import { AdministratorsPage } from './administrators.page';
import { HeaderComponent } from 'src/app/shared/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderComponent,
    AdministratorsPageRoutingModule
  ],
  declarations: [AdministratorsPage]
})
export class AdministratorsPageModule {}
