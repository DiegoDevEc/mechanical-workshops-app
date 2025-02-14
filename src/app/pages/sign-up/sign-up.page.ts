
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: false,
})
export class SignUpPage implements OnInit {
  signupForm: FormGroup;
  isPhoneRegistered: boolean = false;

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      identification: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });}

  ngOnInit(): void {
  }

  async validatePhone() {
    console.log('Validando número de teléfono...');

    const phoneControl = this.signupForm.get('phone');
    console.log('Número de teléfono Caaaaaa:', phoneControl?.valid);

    if (phoneControl?.valid) {
      console.log('Número de teléfono Validddddd:', phoneControl);
      const phone = phoneControl.value;
      this.isPhoneRegistered = await this.checkPhoneNumber(phone);
      console.log('Número de teléfono:', phone);

      console.log('¿El número de teléfono está registrado?', this.isPhoneRegistered);

      if (this.isPhoneRegistered) {
        phoneControl.setErrors({ phoneRegistered: true }); // Marca el campo como inválido
      }
    }
  }

  async checkPhoneNumber(phone: string) {
    return true;
    /*try {
      const response = await this.http
        .post<{ exists: boolean }>('https://your-backend-api.com/check-phone', { phone })
        .toPromise();
      return response.exists;
    } catch (error) {
      console.error('Error checking phone number:', error);
      return false;
    }*/
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
