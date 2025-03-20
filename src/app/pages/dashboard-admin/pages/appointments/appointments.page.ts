import { Appointment } from './../../../../core/interface/appointment-interface';
import { TechnicialService } from './../../../../core/services/api/technicial.service';
import { ServicesService } from 'src/app/core/services/api/services.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent, IonList, IonModal, LoadingController, NavController } from '@ionic/angular';
import { MessageService } from 'src/app/core/services/api/message.service';
import { AppointmentsService } from 'src/app/core/services/api/appointments.service';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
  standalone: false
})
export class AppointmentsPage implements OnInit {

  @ViewChild(IonList) ionList!: IonList;

  @ViewChild('datetimeModalStart', { static: true }) datetimeModalStart!: IonModal;
  @ViewChild('datetimeModalFinish', { static: true }) datetimeModalFinish!: IonModal;
  @ViewChild('openModalMppointments', { static: true }) openModalMppointments!: IonModal;

  @ViewChild(IonContent, { static: false }) content!: IonContent;


  pages: number = 0;
  size: number = 10;
  text: string = '';
  appointments: any[] = [];
  services: any[] = [];
  technicians: any[] = [];
  pageResponse: any;

  appointment?: Appointment;

  message: string = '';
  isProblemServer = false

  selectService = '';
  selectTechnical = '';

  isView = false;

  startDate: string | null = this.getCurrentDate(); // Variable para almacenar la fecha inicial
  finishDate: string | null = null; // Variable para almacenar la fecha fina
  statusFilter: string = '';

  constructor(
    private appointmentsService: AppointmentsService,
    private alertController: AlertController,
    private servicesService: ServicesService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private technicialService: TechnicialService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.appointments = [];
    this.chargeInformation();
    this.chargeServices();
    this.chargeTechnicians();
  }

  updateAppoiment(appointment: any) {
    this.appointment = appointment;
    this.selectTechnical = appointment.technician !== null ? appointment.technician.id : ''
    this.selectService = appointment.service !== null ? appointment.service.id : ''
    this.isView = false;
    this.openModal(this.openModalMppointments)
  }

  async cancelAppoiment(appointmentId: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar cancelación',
      message: '¿Estás seguro de que deseas cancelar esta cita?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancelación abortada');
          }
        },
        {
          text: 'Sí, cancelar',
          handler: async () => {
            console.log('Cancelando cita con ID:', appointmentId);

            this.appointmentsService.deleteAppointments(appointmentId).subscribe(
              (response: any) => {
                this.messageService.presentToast('Cita cancelada', 'success');
                this.chargeInformation();
              },
              (error: any) => {
                this.messageService.presentToast('Error al cancelar la cita: ' + error.error.message, 'danger');
                if (error.error.message.includes('token')) {
                  this.navCtrl.navigateRoot('/login');
                }
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  async onIonInfinite(event: any) {
    if ((this.pageResponse.totalPages - 1) <= this.pages) {
      event.target.complete();
      return;
    }
    this.pages++;
    this.chargeInformation();
    event.target.complete();
  }

  async chargeInformation() {

    const loading = await this.loadingController.create({
      message: 'Cargando información...',
      spinner: 'circular',
    });

    await loading.present();

    try {

      const startDateValue = this.startDate === null ? '' : this.startDate;
      const endDateValue = this.finishDate === null ? '' : this.finishDate;
      const statusValue = this.statusFilter === '' ? '' : this.statusFilter;

      const data: any = await this.appointmentsService.getAppointments(this.pages, this.size, startDateValue, endDateValue, statusValue).toPromise();
      this.pageResponse = data;
      this.appointments = data.content;

    } catch (error: any) {
      this.messageService.presentToast('Error al cargar la información: ' + error.error.message, 'danger');
      if (error.error.message.includes('token')) {
        this.navCtrl.navigateRoot('/login');
      }
    } finally {
      await loading.dismiss();
    }
  }

  async chargeServices() {
    try {
      const data: any = await this.servicesService.getService(this.pages, this.size, this.text).toPromise();
      this.pageResponse = data;
      this.services = data.content;


    } catch (error: any) {
      this.messageService.presentToast('Error al cargar la información: ' + error.error.message, 'danger');
      if (error.error.message.includes('token')) {
        this.navCtrl.navigateRoot('/login');
      }
    }
  }

  async chargeTechnicians() {
    try {
      const data: any = await this.technicialService.getTechnician(this.pages, this.size, this.text).toPromise();
      this.pageResponse = data;
      this.technicians = data.content;

    } catch (error: any) {
      this.messageService.presentToast('Error al cargar la información: ' + error.error.message, 'danger');
      if (error.error.message.includes('token')) {
        this.navCtrl.navigateRoot('/login');
      }
    }
  }

  cancel() {
    this.openModalMppointments.dismiss(null, 'cancel');
  }

  confirm() {

    if (!this.appointment) {
      console.error('Error: El administrador es indefinido o nulo');
      return;
    }
    if (this.selectService === '') {
      this.messageService.presentToast('Error: El servicio debe ser seleccionado', 'danger');
      return;
    }
    if (this.selectTechnical === '') {
      this.messageService.presentToast('Error: El técnico debe ser seleccionado', 'danger');
      return;
    }

    this.appointmentsService.updateAppointments(this.appointment, this.selectService, this.selectTechnical).subscribe(
      (response) => {
        this.messageService.presentToast('Cita actualizada - Turno en progreso', 'success');
        this.chargeInformation();
      },
      (error) => {
        this.messageService.presentToast('Cita NO actualizada', 'danger');
      },
      () => {
        this.openModalMppointments.dismiss(null, 'cancel');
      }
    )
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.selectService = '';
      this.selectTechnical = '';
    }
    if (event.detail.role === 'cancel') {
      this.ionList.closeSlidingItems();
      this.appointment = undefined;
      this.selectService = '';
      this.selectTechnical = '';
    }
  }

  getStatusColor(status: string): string {
    const colorMap: { [key: string]: string } = {
      'PROGRESS': 'warning',
      'INGRESS': 'primary',
      'NOTIFIED': 'tertiary',
      'FINISH': 'success',
      'CANCELED': 'danger'
    };
    return colorMap[status] || 'medium';
  }


  onStartDateChange(event: any) {
    if (event && event.detail.value) {
      const selectedDate = new Date(event.detail.value);
      this.startDate = this.formatDate(selectedDate);
      this.chargeInformation();
    }
  }

  onEndDateChange(event: any) {
    if (event && event.detail.value) {
      const selectedDate = new Date(event.detail.value);
      this.finishDate = this.formatDate(selectedDate);
      this.chargeInformation();
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses van de 0-11
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  closeModal(modal: IonModal) {
    modal.dismiss();
  }

  openModal(modal: IonModal) {
    modal.present();
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onStatusChange(event: any) {
    this.chargeInformation()
  }

  scrollToTop() {
    this.content.scrollToTop(500);  // 500ms de animación
  }

  clearFilters(){
    this.startDate = this.getCurrentDate();
    this.finishDate = null;
    this.statusFilter = '';
    this.scrollToTop()
    this.chargeInformation();
  }
}
