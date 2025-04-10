import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, IonModal, IonContent, AlertController, NavController, LoadingController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { AttendancesService } from 'src/app/core/services/api/attendances-available.service';
import { AuthService } from 'src/app/core/services/api/auth.service';
import { MessageService } from 'src/app/core/services/api/message.service';

@Component({
  selector: 'app-attendances-history',
  templateUrl: './attendances-history.page.html',
  styleUrls: ['./attendances-history.page.scss'],
  standalone: false
})
export class AttendancesHistoryPage implements OnInit {


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
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private messageService: MessageService) { }

  ngOnInit() {
    this.attendances = [];
    this.chargeInformation();
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
        .getAttendancesByTechnical(clientId, this.pages, this.size, statusValue)
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

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
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
    this.content.scrollToTop(500);
  }

  clearFilters() {
    this.statusFilter = '';
    this.scrollToTop()
    this.chargeInformation();
  }

}
