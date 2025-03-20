import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, IonModal, LoadingController, NavController } from '@ionic/angular';
import { AdministratorsService } from 'src/app/core/services/api/administrators.service';
import { MessageService } from 'src/app/core/services/api/message.service';

import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/api/user.service';
import { lastValueFrom, Observable } from 'rxjs';
import { UserSaveRequestDTO } from 'src/app/core/interface/user-interface';

@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.page.html',
  styleUrls: ['./administrators.page.scss'],
  standalone: false
})
export class AdministratorsPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild(IonList) ionList!: IonList;

  pages: number = 0;
  size: number = 10;
  text: string = '';
  administrators: any[] = [];
  pageResponse: any;

  administratorForm: FormGroup;
  message: string = '';
  isProblemServer = false

  title = 'Registrar';

  isUpdate: any;
  idUser: string | undefined;

  constructor(private administratorsService: AdministratorsService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private httpUser: UserService,
    private fb: FormBuilder,
    private messageService: MessageService) {
    this.administratorForm = this.initForm();
  }


  initForm() {
    if (this.administratorForm) {
      this.administratorForm.reset();
    }
    return this.fb.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      identification: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  async ngOnInit() {
    this.administrators = [];
    this.chargeInformation();
  }

  async search() {
    if (this.text.length >= 3 || this.text.length === 0) {
      this.pages = 0;
      this.administrators = [];
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
      const data: any = await this.administratorsService.getAdministrators(this.pages, this.size, this.text).toPromise();
      this.pageResponse = data;
      this.administrators = data.content;
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

  deleteAdministrator(id: string){
    this.administratorsService.deleteAdministrator(id).subscribe(
      (response) => {
        console.log('✅ Usuario eliminado:', response);
        this.messageService.presentToast('Usuario eliminado exitosamente', 'success');
        this.chargeInformation();
      },
      (error) => {
        console.error('❌ Error al eliminar usuario:', error);
        this.messageService.presentToast('Usuario NO eliminado', 'danger');
      }
    )
    };

  updateAdministrator(administrator: any) {
    if (!administrator) {
      console.error('Error: El administrador es indefinido o nulo');
      return;
    }
    this.title = 'Actualizar';
    this.isUpdate = true;
    this.idUser = administrator.id;
    this.administratorForm.patchValue(administrator);
    this.administratorForm.get('password')?.clearValidators();
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
    const control = this.administratorForm.get(fieldName);
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

    if (this.administratorForm.invalid) {
      return;
    }

    const userData: UserSaveRequestDTO = {
      id: undefined,
      username: this.administratorForm.value.username,
      firstname: this.administratorForm.value.firstname,
      lastname: this.administratorForm.value.lastname,
      identification: this.administratorForm.value.identification,
      email: this.administratorForm.value.email,
      phone: this.administratorForm.value.phone,
      address: this.administratorForm.value.address,
      password: this.administratorForm.value.password,
      role: 'ADMINISTRATOR'
    };

    if (this.isUpdate) {
      userData.id = this.idUser;
    }

    this.administratorsService.registerAdministrator(userData).subscribe(
      (response) => {
        console.log('✅ Usuario registrado:', response);
        this.administratorForm.reset();
        this.messageService.presentToast('Usuario registrado exitosamente', 'success');
        this.chargeInformation();
      },
      (error) => {
        console.error('❌ Error al registrar usuario:', error);
        this.messageService.presentToast('Usuario NO registrado', 'danger');
      }
    );

  }

}
