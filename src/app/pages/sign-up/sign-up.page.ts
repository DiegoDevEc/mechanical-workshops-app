
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { lastValueFrom, Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/api/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: false,
})
export class SignUpPage implements OnInit {
  signupForm: FormGroup;

  isProblemServer = false;

  constructor(
    private httpUser: UserService,
    private navCtrl: NavController,
    private fb: FormBuilder
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      identification: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
  }

  async validateField(
    fieldName: 'phone' | 'identification' | 'email' | 'username',
    checkFunction: (value: string) => Promise<boolean>
  ) {
    const control = this.signupForm.get(fieldName);

    if (control?.valid) {
      const value = control.value;

      this.isProblemServer = false;

      const isRegistered = await checkFunction(value);
      control.setErrors({ [`${fieldName}Registered`]: isRegistered, serverError: this.isProblemServer });
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
    await this.validateField('email', (email) => this.checkIfRegistered(this.httpUser.checkIdentification.bind(this.httpUser), email));
  }

  async validateUsername() {
    await this.validateField('username', (username) => this.checkIfRegistered(this.httpUser.checkIdentification.bind(this.httpUser), username));
  }

  async register() {

    if (this.signupForm.invalid) {
      return;
    }

    // Si el número no está registrado, procede con el registro
    const userData = this.signupForm.value;
    console.log('Datos del usuario:', userData);

    // Aquí puedes hacer la petición al backend para registrar al usuario
    // Ejemplo:
    // this.http.post('https://your-backend-api.com/register', userData).subscribe(...);
  }

  cancel() {
    this.navCtrl.navigateForward('/login');
  }
}
