import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-home-technician',
  templateUrl: './home-technician.page.html',
  styleUrls: ['./home-technician.page.scss'],
  standalone: false
})
export class HomeTechnicianPage implements OnInit {

  public pieChartType: ChartType = 'line';

  public pieChartData: ChartData<'line', number[], string | string[]> = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
    datasets: [
      {
        label: 'Finalizados',
        data: [10, 50, 40, 50],
        borderColor: '#66BB6A',
        fill: false
      }
    ]
  };

  public citaChartType: ChartType = 'doughnut';
  public citaChartData: ChartData<'doughnut'> = {
    labels: ['Ingresado', 'En proceso', 'Cancelada', 'Finalizada'],
    datasets: [
      {
        data: [10, 5, 3, 100], // ejemplo de cantidades
        backgroundColor: ['#42A5F5', '#FFA726', '#EF5350', '#66BB6A']
      }
    ]
  };

  constructor() { }

  ngOnInit() {
  }

}
