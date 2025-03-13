import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonList, IonModal, LoadingController, NavController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { ServiceSaveRequestDto } from 'src/app/core/interface/service-interface';
import { MessageService } from 'src/app/core/services/api/message.service';
import { ServicesService } from 'src/app/core/services/api/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
  standalone: false
})
export class ServicesPage implements OnInit {


  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild(IonList) ionList!: IonList;

  pages: number = 0;
  size: number = 10;
  text: string = '';
  services: any[] = [];
  pageResponse: any;

  servicesForm: FormGroup;
  message: string = '';
  isProblemServer = false

  title = 'Registrar';

  isUpdate: any;
  idService: string | undefined;

  constructor(private servicesService: ServicesService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private fb: FormBuilder,
    private messageService: MessageService) {
    this.servicesForm = this.initForm();
  }


  initForm() {
    if (this.servicesForm) {
      this.servicesForm.reset();
    }
    return this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      cost: ['', Validators.required]
    });

  }

  async ngOnInit() {
    this.services = [];
    this.chargeInformation();
  }

  async search() {
    if (this.text.length >= 3 || this.text.length === 0) {
      this.pages = 0;
      this.services = [];
      this.chargeInformation();
    }
  }

  async chargeInformation() {

    const loading = await this.loadingController.create({
      message: 'Cargando información...',
      spinner: 'circular',
    });

    await loading.present();

    try {
      const data: any = await this.servicesService.getService(this.pages, this.size, this.text).toPromise();
      this.pageResponse = data;
      this.services = data.content;
    } catch (error: any) {
      this.messageService.presentToast('Error al cargar la información: ' + error.error.message, 'danger');
      if (error.error.message.includes('token')) {
        this.navCtrl.navigateRoot('/login');
      }
    } finally {
      await loading.dismiss();
    }
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

  deleteService(id: string){
    this.servicesService.deleteService(id).subscribe(
      (response) => {
        console.log('✅ Servicio eliminado:', response);
        this.messageService.presentToast('Servicio eliminado exitosamente', 'success');
        this.chargeInformation();
      },
      (error) => {
        console.error('❌ Error al eliminar servicio:', error);
        this.messageService.presentToast('Servicio NO eliminado', 'danger');
      }
    )
    };

    updateService(service: any) {
    if (!service) {
      console.error('Error: El usuario es indefinido o nulo');
      return;
    }
    this.title = 'Actualizar';
    this.isUpdate = true;
    this.idService = service.id;
    this.servicesForm.patchValue(service);
    this.modal.present();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.register();
    }
    if (event.detail.role === 'cancel') {
      this.ionList.closeSlidingItems();
      this.isUpdate
      if (this.isUpdate) {
        this.messageService.presentToast('Datos no actualizados', 'warning');
        this.title = 'Registrar';
        this.isUpdate = false;
        this.idService = undefined;
      }
      this.initForm();
    }
  }

  /*async validateField(
    fieldName: 'phone' | 'identification' | 'email' | 'username',
    checkFunction: (value: string) => Promise<boolean>
  ) {
    const control = this.technicialsForm.get(fieldName);
    if (control?.valid) {
      const value = control.value;
      this.isProblemServer = false;
      const isRegistered = await checkFunction(value);
      if (isRegistered) {
        control.setErrors({ [`${fieldName}Registered`]: isRegistered, serverError: this.isProblemServer });
      }
    }
  }*/

  /*async checkIfRegistered(
    endpoint: (value: string, extraParam: any) => Observable<any>,
    value: string
  ): Promise<boolean> {
    try {
      if (!value) {
        return true;
      }
      const response = await lastValueFrom(endpoint(value, undefined));
      return false;
    } catch (error: any) {
      if (error.status === 0 || error.status === 404) {
        this.isProblemServer = true;
        return false;
      }
      return true;
    }
  }*/
/*
  async validatePhone() {
    await this.validateField('phone', (phone) => this.checkIfRegistered(this.httpUser.checkPhoneNumber.bind(this.httpUser), phone));
  }

  async validateIdentification() {
    await this.validateField('identification', (identification) => this.checkIfRegistered(this.httpUser.checkIdentification.bind(this.httpUser), identification));
  }

  async validateEmail() {
    await this.validateField('email', (email) => this.checkIfRegistered(this.httpUser.checkEmail.bind(this.httpUser), email));
  }

  async validateUsername() {
    await this.validateField('username', (username) => this.checkIfRegistered(this.httpUser.checkUsername.bind(this.httpUser), username));
  }
*/
  async register() {

    if (this.servicesForm.invalid) {
      return;
    }

    const serviceData : ServiceSaveRequestDto = {
      id: undefined,
      name: this.servicesForm.value.name,
      description: this.servicesForm.value.description,
      cost: this.servicesForm.value.cost
    };

    if (this.isUpdate) {
      serviceData.id = this.idService;
    }

    this.servicesService.registerService(serviceData).subscribe(
      (response) => {
        console.log('✅ Servicio registrado:', response);
        this.servicesForm.reset();
        this.messageService.presentToast('Servicio registrado exitosamente', 'success');
        this.chargeInformation();
      },
      (error) => {
        console.error('❌ Error al registrar servicio:', error);
        this.messageService.presentToast('Servicio NO registrado', 'danger');
      }
    );

  }



}
