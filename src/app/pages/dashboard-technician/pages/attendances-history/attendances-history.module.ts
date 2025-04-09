import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendancesHistoryPageRoutingModule } from './attendances-history-routing.module';

import { AttendancesHistoryPage } from './attendances-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendancesHistoryPageRoutingModule
  ],
  declarations: [AttendancesHistoryPage]
})
export class AttendancesHistoryPageModule {}
