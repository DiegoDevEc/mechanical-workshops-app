import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { lastValueFrom, Observable } from 'rxjs';
import { UserSaveRequestDTO } from 'src/app/core/interface/user-interface';
import { MessageService } from 'src/app/core/services/api/message.service';
import { UserService } from 'src/app/core/services/api/user.service';

@Component({
  selector: 'app-form-administrator',
  templateUrl: './form-administrator.page.html',
  styleUrls: ['./form-administrator.page.scss'],
  standalone: false
})
export class FormAdministratorPage implements OnInit {

  administratorForm: FormGroup;

  isProblemServer = false;

  constructor(
    private httpUser: UserService,
    private navCtrl: NavController,
    private fb: FormBuilder,
    private messageService: MessageService) {
    this.administratorForm = this.fb.group({
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

  ngOnInit() {
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
      if(isRegistered) {
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

     console.log('Datos del usuario:', userData);

     this.httpUser.registerUser(userData).subscribe(
       (response) => {
         console.log('✅ Usuario registrado:', response);
         this.administratorForm.reset();
         this.messageService.presentToast('Usuario registrado exitosamente', 'success');
         this.navCtrl.navigateForward('/dashboard-admin/administrators');
       },
       (error) => {
         console.error('❌ Error al registrar usuario:', error);
         this.messageService.presentToast('Usuario NO registrado', 'danger');
       }
     );
  }

  cancel() {
    this.navCtrl.navigateForward('/dashboard-admin/administrators');
  }

}
