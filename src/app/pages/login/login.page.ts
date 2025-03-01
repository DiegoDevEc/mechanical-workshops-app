import { AuthRequestDto } from './../../core/interface/user-interface';
import { AuthService } from './../../core/services/api/auth.service';
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

  constructor(private navCtrl: NavController, private authService: AuthService) {}

  ngOnInit(): void {

  }

  async login() {

    const authRequestDto: AuthRequestDto = {
      username: this.phoneNumber,
      password: this.password
    };

    this.authService.loginUser(authRequestDto).subscribe(async (response) => {
      console.log('✅ Respuesta del servidor:', response);
      await this.authService.saveToken(response.accessToken);

      const role = await this.authService.getUserRole();

      switch (role) {
        case 'CLIENT':
          this.navCtrl.navigateForward('/dashboard');
          break;
        case 'ADMINISTRATOR':
          this.navCtrl.navigateForward('/dashboard-admin');
          break;
        case 'TECHNICIAN':
          this.navCtrl.navigateForward('/dashboard-technician');
          break;
        default:
          this.navCtrl.navigateForward('/login');
          break;
      }
    },
    (error) => {
      console.error('❌ Error al iniciar sesión:', error);
    });
  }

  singUp() {
    this.navCtrl.navigateForward('/sign-up');
  }
}
