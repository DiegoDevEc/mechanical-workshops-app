import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AuthService } from 'src/app/core/services/api/auth.service';
import { DashboardService } from 'src/app/core/services/api/dashboard.service';

@Component({
  selector: 'app-home-technician',
  templateUrl: './home-technician.page.html',
  styleUrls: ['./home-technician.page.scss'],
  standalone: false
})
export class HomeTechnicianPage implements OnInit {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public pieChartType: ChartType = 'line';

  public pieChartData: ChartData<'line', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        label: 'Finalizados',
        data: [],
        borderColor: '#66BB6A',
        fill: false
      }
    ]
  };

  public citaChartType: ChartType = 'doughnut';
  public citaChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#42A5F5', '#FFA726', '#66BB6A', '#FF7043', '#AB47BC'],
      }
    ]
  };

  public citaChartOptions: any = {
    responsive: true,
    plugins: {
      // Configuración del plugin datalabels
      datalabels: {
        display: true, // Asegúrate de que esté activado
        color: '#FFFFFF', // Color del texto
        font: {
          weight: 'bold',
          size: 14
        },
        formatter: (value: number, ctx: any) => {
          return value; // Muestra el valor directamente
          // Opcional: Mostrar porcentaje
          const total = ctx.dataset.data.reduce((a: any, b: any) => a + b, 0);
           return `${value} (${Math.round((value / total) * 100)}%)`;
        }
      },
      // Configuración de la leyenda (opcional)
      legend: {
        display: true,
        position: 'bottom'
      }
    }
  };

  startDate: any;
  endDate: any;

  constructor(private dashboardService: DashboardService,
    private authService: AuthService) {
    this.initDate();
  }

  async ngOnInit() {
    await this.chargeInformation();
  }

  async chargeInformation() {

    const userData = await this.authService.getUserData();
    const technicianId = userData.keyId;

    this.dashboardService.getDashboardByTechnician({
      entityId: technicianId,
      startDate: this.startDate, endDate: this.endDate
    }).subscribe((response: any) => {
      const dataStatus = response.data.dataStatus;
      if (dataStatus) {
        const labels = Object.keys(response.data.dataStatus);
        const dataStatusValues = Object.values(response.data.dataStatus).map(value => Number(value));
        this.citaChartData.labels?.pop();
        this.citaChartData.datasets[0].data?.pop();
        this.citaChartData.labels = labels;
        this.citaChartData.datasets[0].data = dataStatusValues;
        this.chart?.update();
      }
    });
  }

  closeModal(modal: IonModal) {
    modal.dismiss();
  }

  onStartDateChange(event: any) {
    if (event && event.detail.value) {
      const selectedDate = new Date(event.detail.value);
      this.startDate = this.formatDate(selectedDate);
      this.chargeInformation();
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses van de 0-11
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  openModal(modal: IonModal) {
    modal.present();
  }

  onEndDateChange(event: any) {
    if (event && event.detail.value) {
      const selectedDate = new Date(event.detail.value);
      this.endDate = this.formatDate(selectedDate);
      this.chargeInformation();
    }
  }
  initDate() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 30);
    const formattedDate = this.formatDate(currentDate);
    this.startDate = formattedDate;
  }

}
