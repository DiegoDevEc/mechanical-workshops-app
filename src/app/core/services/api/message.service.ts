import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastController: ToastController) { }

  async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 3000, // Duración en milisegundos
      position: 'top', // 'top', 'middle' o 'bottom'
      color, // Color del mensaje ('success' para éxito, 'danger' para error)
    });
    await toast.present();
  }

}
