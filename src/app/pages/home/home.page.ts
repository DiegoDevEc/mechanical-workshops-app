import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit{

  constructor(private navCtrl: NavController) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.navCtrl.navigateForward('/login');
    }, 3000);
  }



}
