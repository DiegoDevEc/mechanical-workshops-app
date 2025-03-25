import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonList, IonModal, LoadingController, NavController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { lastValueFrom, Observable } from 'rxjs';
import { UserSaveRequestDTO } from 'src/app/core/interface/user-interface';
import { ClientsService } from 'src/app/core/services/api/clients.service';
import { MessageService } from 'src/app/core/services/api/message.service';
import { UserService } from 'src/app/core/services/api/user.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
  standalone: false
})
export class ClientsPage implements OnInit {


  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild(IonList) ionList!: IonList;

  pages: number = 0;
  size: number = 10;
  text: string = '';
  clients: any[] = [];
  pageResponse: any;

  clientsForm: FormGroup;
  message: string = '';
  isProblemServer = false

  title = 'Registrar';

  isUpdate: any;
  idUser: string | undefined;

  constructor(private clientService: ClientsService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private httpUser: UserService,
    private fb: FormBuilder,
    private messageService: MessageService) {
    this.clientsForm = this.initForm();
  }


  initForm() {
    if (this.clientsForm) {
      this.clientsForm.reset();
    }
    return this.fb.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      identification: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required]
    });

  }


  async ngOnInit() {
    this.clients = [];
    this.chargeInformation();
  }

  async search() {
    if (this.text.length >= 3 || this.text.length === 0) {
      this.pages = 0;
      this.clients = [];
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
      const data: any = await this.clientService.getClients(this.pages, this.size, this.text).toPromise();
      this.pageResponse = data;
      this.clients = data.content;
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

  deleteClient(id: string){
    this.clientService.deleteClient(id).subscribe(
      (response) => {
        console.log('✅ Cliente eliminado:', response);
        this.messageService.presentToast('Cliente eliminado exitosamente', 'success');
        this.chargeInformation();
      },
      (error) => {
        console.error('❌ Error al eliminar cliente:', error);
        this.messageService.presentToast('Cliente NO eliminado', 'danger');
      }
    )
    };

    updateClient(client: any) {
    if (!client) {
      console.error('Error: El cliente es indefinido o nulo');
      return;
    }
    this.title = 'Actualizar';
    this.isUpdate = true;
    this.idUser = client.id;
    this.clientsForm.patchValue(client);
    this.clientsForm.get('password')?.clearValidators();
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
        this.idUser = undefined;
      }
      this.initForm();
    }
  }

  async validateField(
    fieldName: 'phone' | 'identification' | 'email' | 'username',
    checkFunction: (value: string) => Promise<boolean>
  ) {
    const control = this.clientsForm.get(fieldName);
    if (control?.valid) {
      const value = control.value;
      this.isProblemServer = false;
      const isRegistered = await checkFunction(value);
      if (isRegistered) {
        control.setErrors({ [`${fieldName}Registered`]: isRegistered, serverError: this.isProblemServer });
      }
    }
  }

  async checkIfRegistered(
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
  }

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

  async register() {

    if (this.clientsForm.invalid) {
      return;
    }

    const userData: UserSaveRequestDTO = {
      id: undefined,
      username: this.clientsForm.value.username,
      firstname: this.clientsForm.value.firstname,
      lastname: this.clientsForm.value.lastname,
      identification: this.clientsForm.value.identification,
      email: this.clientsForm.value.email,
      phone: this.clientsForm.value.phone,
      address: this.clientsForm.value.address,
      password: this.clientsForm.value.password,
      role: 'CLIENT'
    };

    if (this.isUpdate) {
      userData.id = this.idUser;
    }

    this.clientService.registerClient(userData).subscribe(
      (response) => {
        console.log('✅ Cliente registrado:', response);
        this.clientsForm.reset();
        this.messageService.presentToast('Cliente registrado exitosamente', 'success');
        this.chargeInformation();
      },
      (error) => {
        console.error('❌ Error al registrar usuario:', error);
        this.messageService.presentToast('Usuario NO registrado', 'danger');
      }
    );

  }


}
