import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeClientsPageRoutingModule } from './home-clients-routing.module';

import { HomeClientsPage } from './home-clients.page';
import { HeaderComponent } from 'src/app/shared/header/header.component';

import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { NgChartsModule } from 'ng2-charts';

// Registra el plugin globalmente
Chart.register(ChartDataLabels);


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderComponent,
    NgChartsModule,
    HomeClientsPageRoutingModule
  ],
  declarations: [HomeClientsPage]
})
export class HomeClientsPageModule {}
