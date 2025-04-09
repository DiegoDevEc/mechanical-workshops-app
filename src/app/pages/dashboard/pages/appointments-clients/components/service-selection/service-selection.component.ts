import {
  IonList, IonListHeader, IonLabel, IonItem, IonButton,
  IonContent
} from '@ionic/angular/standalone';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ServicesService } from 'src/app/core/services/api/services.service';
import { LoadingController, NavController } from '@ionic/angular';
import { MessageService } from 'src/app/core/services/api/message.service';
import { AuthService } from 'src/app/core/services/api/auth.service';
import { AppointmentsService } from 'src/app/core/services/api/appointments.service';
import { ReservationService } from '../../services/reservation.service';


@Component({
  selector: 'app-service-selection',
  templateUrl: './service-selection.component.html',
  styleUrls: ['./service-selection.component.scss'],
  imports: [IonList, IonListHeader, IonLabel, IonItem, IonButton, IonContent]
})
export class ServiceSelectionComponent {

  @Output() serviceSelected = new EventEmitter<any>();
  @Output() back = new EventEmitter<void>();

  selectedService: any;
  services: any[] = [];

  pages: number = 0;
  size: number = 10;
  text: string = '';

  constructor(private servicesService: ServicesService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private messageService: MessageService,
    private authService: AuthService,
    private appointmentsService: AppointmentsService,
    private reservastionService: ReservationService

  ) {
    this.chargeServices();
  }

  async chargeServices() {

    const loading = await this.loadingController.create({
      message: 'Cargando información...',
      spinner: 'circular',
    });

    await loading.present();

    try {
      const data: any = await this.servicesService.getService(this.pages, this.size, this.text)
        .toPromise();
      this.services = data;
      this.services = data.content;
      await loading.dismiss();

    } catch (error: any) {
      this.messageService.presentToast('Error al cargar la información: ' + error.error.message, 'danger');
      if (error.error.message.includes('token')) {
        this.navCtrl.navigateRoot('/login');
      }

      await loading.dismiss();
    }
  }

  selectService(service: any) {
    this.selectedService = service;
  }

  /*  confirmService() {
      this.serviceSelected.emit(this.selectedService);
    }*/

  async confirmService() {

    const loading = await this.loadingController.create({
      message: 'Generando Turno...',
      spinner: 'circular',
    });

    await loading.present();

    if (this.selectedService) {

      const reservation = this.reservastionService.getState();

      let appointmentSave = {
        serviceId: this.selectedService.id,
        clientId: undefined,
        vehicleId: reservation.vehicule.id,
        availableAppointmentId: reservation.dateTime.id
      }

      await this.authService.getUserData().then(async (userData: any) => {
        appointmentSave.clientId = userData.keyId;
      });

      try {
        this.appointmentsService.registerAppointment(appointmentSave).toPromise()
          .then(async (response: any) => {
            if (response) {
              this.messageService.presentToast('Turno generado con éxito', 'success');
              this.serviceSelected.emit(this.selectedService);
              await loading.dismiss();
            }
          })
      } catch (error: any) {
        this.messageService.presentToast('Error al cargar la información: ' + error.error.message, 'danger');
        if (error.error.message.includes('token')) {
          this.navCtrl.navigateRoot('/login');
        }
      } finally {
        await loading.dismiss();
      }
    }
  }

  goBack() {
    this.back.emit();
  }

}
