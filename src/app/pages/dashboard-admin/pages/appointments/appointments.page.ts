import { Appointment } from './../../../../core/interface/appointment-interface';
import { TechnicialService } from './../../../../core/services/api/technicial.service';
import { ServicesService } from 'src/app/core/services/api/services.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonList, IonModal, LoadingController, NavController } from '@ionic/angular';
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

  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild(IonList) ionList!: IonList;

  pages: number = 0;
  size: number = 10;
  startDate: string = '2025-03-18';
  endDate: string = '';
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

  search() {
    console.log("search");
  }

  updateAppoiment(appointment: any) {
    this.appointment = appointment;
    this.selectTechnical = appointment.technician !== null ? appointment.technician.id : ''
    this.selectService = appointment.service !== null ? appointment.service.id : ''
    this.isView = false;
    this.modal.present();
  }

  async cancelAppoiment(appointmentId: any) {
    console.log('ID de la cita:', appointmentId);

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
          handler: async () => {  // Usar una función flecha para capturar correctamente `appointmentId`
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
      const data: any = await this.appointmentsService.getAppointments(this.pages, this.size, this.startDate, this.endDate).toPromise();
      this.pageResponse = data;
      this.appointments = data.content;
      console.log(this.appointments);

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
      console.log(this.technicians);


    } catch (error: any) {
      this.messageService.presentToast('Error al cargar la información: ' + error.error.message, 'danger');
      if (error.error.message.includes('token')) {
        this.navCtrl.navigateRoot('/login');
      }
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
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
        console.log('✅ Appointment actualizado:', response);
        this.messageService.presentToast('Cita actualizada - Turno en progreso', 'success');
        this.chargeInformation();
      },
      (error) => {
        console.error('❌ Error al actualizar Appointment:', error);
        this.messageService.presentToast('Cita NO actualizada', 'danger');
      },
      () => {
        this.modal.dismiss(null, 'confirm');
      }
    )
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      console.log('Registrando .....');
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
    return colorMap[status] || 'medium'; // 'medium' como color por defecto
  }

}
