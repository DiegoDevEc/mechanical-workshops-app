import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { MessageService } from 'src/app/core/services/api/message.service';
import { VehiculeService } from 'src/app/core/services/api/vehicule.service';
import { IonItemSliding, IonListHeader, IonItem, IonLabel, IonContent, IonButton, IonList } from "@ionic/angular/standalone";

@Component({
  selector: 'app-vehicule-selection',
  templateUrl: './vehicule-selection.component.html',
  styleUrls: ['./vehicule-selection.component.scss'],
  imports: [IonContent, IonLabel, IonItem, IonListHeader, IonItemSliding, IonButton]
})
export class VehiculeSelectionComponent implements OnInit {

  @Output() vehiculeSelected = new EventEmitter<any>();
  @Output() back = new EventEmitter<void>();

  vehicules: any[] = [];
  selectedVehicule: any;

  constructor(
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private messageService: MessageService,
    private vehiculeService: VehiculeService) {
    this.chargeVehicules();
  }

  ngOnInit() { }

  async registerVehicule() {
    /*
        const loading = await this.loadingController.create({
          message: 'Cargando información...',
          spinner: 'circular',
        });

        await loading.present();

        try {
          const data: any = await this.vehiculeService.registerVehicule();
          this.vehicules = data.data;
          console.log(this.vehicules);

          await loading.dismiss();

        } catch (error: any) {
          this.messageService.presentToast('Error al cargar la información: ' + error.error.message, 'danger');
          if (error.error.message.includes('token')) {
            this.navCtrl.navigateRoot('/login');
          }
          await loading.dismiss();
        }*/
  }

  async chargeVehicules() {

    const loading = await this.loadingController.create({
      message: 'Cargando información...',
      spinner: 'circular',
    });

    await loading.present();

    try {
      const data: any = await this.vehiculeService.getVehicules();
      this.vehicules = data.content;
      await loading.dismiss();

    } catch (error: any) {
      this.messageService.presentToast('Error al cargar la información: ' + error.error.message, 'danger');
      if (error.error.message.includes('token')) {
        this.navCtrl.navigateRoot('/login');
      }
      await loading.dismiss();
    }
  }

  selectVehicule(vehicule: any) {
    this.selectedVehicule = vehicule;
  }

  confirmVehicule() {
    this.vehiculeSelected.emit(this.selectedVehicule);
  }

  goBack() {
    this.back.emit();
  }

}
