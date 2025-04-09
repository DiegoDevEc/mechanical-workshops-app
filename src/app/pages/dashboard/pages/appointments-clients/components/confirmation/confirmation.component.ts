import { IonButton, IonContent, IonCardHeader, IonItem, IonCard, IonCardTitle, IonIcon, IonCardContent, IonLabel } from '@ionic/angular/standalone';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  imports: [IonLabel, IonCardContent, IonItem, IonCardHeader, IonContent, IonButton, IonCard, IonCardTitle, IonIcon, QRCodeComponent]
})
export class ConfirmationComponent {

  @Input() reservationData: any;
  @Output() done = new EventEmitter<void>();

  reservationCode = Math.floor(100000 + Math.random() * 900000);

  constructor() {
  }


  finish() {
    this.done.emit();
  }

}
