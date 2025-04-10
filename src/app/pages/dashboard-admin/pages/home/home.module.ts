import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { HeaderComponent } from 'src/app/shared/header/header.component';
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
    HeaderComponent,
    NgChartsModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
