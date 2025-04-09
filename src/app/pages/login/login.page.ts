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

  constructor(private navCtrl: NavController, private authService: AuthService) { }

  ngOnInit(): void {

  }

  initData() {
    this.phoneNumber = '';
    this.password = '';
  }

  async login() {

    const authRequestDto: AuthRequestDto = {
      username: this.phoneNumber,
      password: this.password
    };

    this.authService.loginUser(authRequestDto).subscribe(async (response) => {
      await this.authService.saveToken(response.accessToken);
      const role = await this.authService.getUserRole();
      const userData = await this.authService.getUserData();
      const changePassword = await userData.changePassword;

      if (changePassword) {
        this.navCtrl.navigateForward('/change-password');
        this.initData();
        return;
      }

      switch (role) {
        case 'CLIENT':
          this.navCtrl.navigateForward('/dashboard');
          this.initData();
          break;
        case 'ADMINISTRATOR':
          this.navCtrl.navigateForward('/dashboard-admin');
          this.initData();
          break;
        case 'TECHNICIAN':
          this.navCtrl.navigateForward('/dashboard-technician');
          this.initData();
          break;
        default:
          this.navCtrl.navigateForward('/login');
          this.initData();
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
