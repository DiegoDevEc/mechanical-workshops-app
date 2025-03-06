import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormAdministratorPageRoutingModule } from './form-administrator-routing.module';

import { FormAdministratorPage } from './form-administrator.page';
import { HeaderComponent } from 'src/app/shared/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HeaderComponent,
    FormAdministratorPageRoutingModule
  ],
  declarations: [FormAdministratorPage]
})
export class FormAdministratorPageModule {}
