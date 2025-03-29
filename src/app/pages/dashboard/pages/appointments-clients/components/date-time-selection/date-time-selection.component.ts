import { Component, EventEmitter, Output } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { IonList, IonLabel, IonItem, IonButton, IonContent } from "@ionic/angular/standalone";
import { AppointmentsAvailableService } from 'src/app/core/services/api/appointments-available.service';
import { MessageService } from 'src/app/core/services/api/message.service';

@Component({
  selector: 'app-date-time-selection',
  templateUrl: './date-time-selection.component.html',
  styleUrls: ['./date-time-selection.component.scss'],
  imports: [IonList, IonItem, IonLabel, IonButton, IonContent]
})
export class DateTimeSelectionComponent {

  @Output() dateTimeSelected = new EventEmitter<any>();

  currentMonth = '';
  selectedDay: any;
  selectedTimeSlot: any;

  days: any[] = [];
  timeSlots: any[] = [];

  constructor(private appointmentsAvailableService: AppointmentsAvailableService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private messageService: MessageService) {
    this.getDaysAvailable();
  }

  async getDaysAvailable() {
    const loading = await this.loadingController.create({
      message: 'Cargando información...',
      spinner: 'circular',
    });

    await loading.present();

    this.appointmentsAvailableService.getAppointmentsDaysAll().subscribe(async (response: any) => {
      if (response) {
        this.days = response.data;
        this.selectDay(this.days[0]);
        this.chargeTimesAvailable(this.days[0].date);
      }
      await loading.dismiss();
    },
      async (error: any) => {
        this.messageService.presentToast('Error al cargar la información: ' + error.error.message, 'danger');
        if (error.error.message.includes('token')) {
          this.navCtrl.navigateRoot('/login');
        }

        await loading.dismiss();
      }
    );
  }

  async chargeTimesAvailable(dateSelected: any) {

    const loading = await this.loadingController.create({
      message: 'Cargando información...',
      spinner: 'circular',
    });
    await loading.present();

    try {
      this.appointmentsAvailableService.getAppointmentsTimesAll(dateSelected).subscribe(async (response: any) => {
        if (response) {
          this.timeSlots = response.data;
          await loading.dismiss();
        }
      });
    }
    catch (error: any) {
      this.messageService.presentToast('Error al cargar la información: ' + error.error.message, 'danger');
      if (error.error.message.includes('token')) {
        this.navCtrl.navigateRoot('/login');
      }
      await loading.dismiss();
    }
  }

  selectDay(day: any) {
    this.days.forEach(d => d.selected = false);
    day.selected = true;
    this.selectedDay = day;
    this.selectedTimeSlot = null;
    this.currentMonth = day.date;
    this.chargeTimesAvailable(day.date);
  }

  selectTimeSlot(slot: any) {
    if (!slot.reserved) {
      const currentMonth = this.currentMonth.split(' - ')[0];
      this.timeSlots.forEach((s: any) => s['selected'] = false);
      slot['selected'] = true;
      this.selectedTimeSlot = slot;
      this.currentMonth = currentMonth + " - " + slot.start;
    }
  }

  confirmSelection() {
    if (this.selectedDay && this.selectedTimeSlot) {
      this.dateTimeSelected.emit({
        date: this.selectedDay.date,
        time: this.selectedTimeSlot.start,
        startTime: this.selectedTimeSlot.start,
        endTime: this.selectedTimeSlot.end,
        id: this.selectedTimeSlot.id,
        code: this.selectedTimeSlot.code
      });
    }
  }
}
