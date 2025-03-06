import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechnicialPageRoutingModule } from './technicial-routing.module';

import { TechnicialPage } from './technicial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TechnicialPageRoutingModule
  ],
  declarations: [TechnicialPage]
})
export class TechnicialPageModule {}
