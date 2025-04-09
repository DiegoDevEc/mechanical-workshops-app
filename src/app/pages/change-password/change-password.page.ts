import { NavController } from '@ionic/angular';
import { MessageService } from './../../core/services/api/message.service';
import { AuthService } from './../../core/services/api/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: false,
})
export class ChangePasswordPage implements OnInit {

  passwordFirts: string = '';
  passwordSecond: string = '';
  showPasswordFirst: boolean = false;
  showPasswordSecond: boolean = false;

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private navController: NavController) { }

  ngOnInit() {
  }

  async changePassword() {

    if (this.passwordSecond !== this.passwordFirts) {
      this.messageService.presentToast('Las contraseñas no coinciden', "danger");
      return;
    }

    if (this.passwordSecond !== ''  && this.passwordFirts !== '' && this.passwordFirts === this.passwordSecond) {

      (await this.authService.ChangePassword(this.passwordFirts)).subscribe(
        (response) => {
          this.messageService.presentToast('Contraseña cambiada con éxito, inicia sesión con tu nueva clave', "success");
          this.authService.logout();
          this.navController.navigateRoot('/login');
        },
        (error) => {
          console.error('❌ Error al cambiar la contraseña:', error);
        }
      );
    }
    else {
      console.log('Password not changed');
    }
  }

    // Función para alternar la visibilidad de las contraseñas
    togglePasswordVisibility(field: string) {
      if (field === 'first') {
        this.showPasswordFirst = !this.showPasswordFirst;
      } else if (field === 'second') {
        this.showPasswordSecond = !this.showPasswordSecond;
      }
    }

}
