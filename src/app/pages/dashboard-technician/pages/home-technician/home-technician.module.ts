import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeTechnicianPageRoutingModule } from './home-technician-routing.module';

import { HomeTechnicianPage } from './home-technician.page';
import { NgChartsModule } from 'ng2-charts';

import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Registra el plugin globalmente
Chart.register(ChartDataLabels);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgChartsModule,
    HomeTechnicianPageRoutingModule
  ],
  declarations: [HomeTechnicianPage]
})
export class HomeTechnicianPageModule {}
