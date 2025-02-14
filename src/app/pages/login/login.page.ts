import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

 phoneNumber: string = '';
  password: string = '';

  constructor(private navCtrl: NavController) {}

  ngOnInit(): void {

  }

  login() {
    console.log('Número de teléfono:', this.phoneNumber);
    console.log('Contraseña:', this.password);
    // TODO: Implementar la lógica de inicio de sesión
  }

  singUp() {
    this.navCtrl.navigateForward('/sign-up');
  }
}
