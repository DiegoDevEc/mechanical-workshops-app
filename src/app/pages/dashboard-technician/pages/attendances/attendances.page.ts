import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, IonModal, IonContent, AlertController, NavController, LoadingController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { AttendancesService } from 'src/app/core/services/api/attendances-available.service';
import { AuthService } from 'src/app/core/services/api/auth.service';
import { MessageService } from 'src/app/core/services/api/message.service';

@Component({
  selector: 'app-attendances',
  templateUrl: './attendances.page.html',
  styleUrls: ['./attendances.page.scss'],
  standalone: false
})
export class AttendancesPage implements OnInit {


  @ViewChild(IonList) ionList!: IonList;

  @ViewChild('openModalAttendencesTech', { static: true }) openModalAttendencesTech!: IonModal;

  @ViewChild(IonContent, { static: false }) content!: IonContent;


  pages: number = 0;
  size: number = 10;
  text: string = '';
  attendances: any[] = [];
  pageResponse: any;

  attendance?: any;

  message: string = '';
  isProblemServer = false

  isView = false;

  statusFilter: string = '';
  startDate?: any;
  startDateDay?: any;
  startDateTime?: any;

  constructor(
    private authService: AuthService,
    private attendancesService: AttendancesService,
    private alertController: AlertController,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private messageService: MessageService) { }

  ngOnInit() {
    this.attendances = [];
    this.chargeInformation();
  }

  async updateIngress(attendance: any) {

    this.startDate = new Date();
    this.startDateDay = this.startDate.getDate();
    this.startDateTime = this.startDate.getHours() + ':' + this.startDate.getMinutes();

    const alert = await this.alertController.create({
      header: 'Esta por confirmar el inicio del servicio',
      message: `¿Deseas confirmar el inicio a las: ${this.startDateTime}?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Iniciación abortada');
          }
        },
        {
          text: 'Sí, Iniciar',
          handler: async () => {
            console.log(attendance);

            this.attendancesService.updateAttendanceIngress(attendance.code).subscribe(
              (response: any) => {
                this.messageService.presentToast('Cita Iniciada', 'success');
                this.chargeInformation();
              },
              (error: any) => {
                this.messageService.presentToast('Error al iniciar la cita: ' + error.error.message, 'danger');
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

  async cancelAttendance(attendanceId: any) {

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
            this.attendancesService.deleteAttendance(attendanceId).subscribe(
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
      const userData = await this.authService.getUserData();
      const clientId = userData.keyId;

      const statusValue = this.statusFilter === '' ? '' : this.statusFilter;

      const data: any = await this.attendancesService
        .getAttendancesByTechnicalAssignated(clientId, this.pages, this.size, statusValue)
        .toPromise();
      this.pageResponse = data;
      this.attendances = data.content;
    } catch (error: any) {
      this.messageService.presentToast('Error al cargar la información: ' + error.error.message, 'danger');
      if (error.error.message.includes('token')) {
        this.navCtrl.navigateRoot('/login');
      }
    } finally {
      await loading.dismiss();
    }
  }

  cancel() {
    this.openModalAttendencesTech.dismiss(null, 'cancel');
  }

  confirm() {

    if (!this.attendance) {
      console.error('Error: El la atención es indefinido o nulo');
      return;
    }

    if (!this.attendance.comments) {
      this.messageService.presentToast('Debe ingresar el detalle del servicio', 'warning');
      return;
    }

    this.attendancesService.updateAttendanceFinalize(this.attendance.code, this.attendance).subscribe(
      (response) => {
        this.messageService.presentToast('Cita actualizada - Turno en finalizado', 'success');
        this.chargeInformation();
      },
      (error) => {
        this.messageService.presentToast('Cita NO actualizada', 'danger');
      },
      () => {
        this.openModalAttendencesTech.dismiss(null, 'cancel');
      }
    )
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {

    }
    if (event.detail.role === 'cancel') {
      this.ionList.closeSlidingItems();
      this.attendance = undefined;
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

  updateAttendances(attendance: any) {
    this.attendance = attendance;
    this.isView = false;
    this.openModal(this.openModalAttendencesTech)
  }

  closeModal(modal: IonModal) {
    modal.dismiss();
  }

  openModal(modal: IonModal) {
    modal.present();
  }

  onStatusChange(event: any) {
    this.chargeInformation()
  }

  scrollToTop() {
    this.content.scrollToTop(500);  // 500ms de animación
  }

  clearFilters() {
    this.statusFilter = '';
    this.scrollToTop()
    this.chargeInformation();
  }

}
