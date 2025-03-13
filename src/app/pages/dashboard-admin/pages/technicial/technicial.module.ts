import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechnicialPageRoutingModule } from './technicial-routing.module';

import { TechnicialPage } from './technicial.page';
import { HeaderComponent } from 'src/app/shared/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HeaderComponent,
    TechnicialPageRoutingModule
  ],
  declarations: [TechnicialPage]
})
export class TechnicialPageModule {}
