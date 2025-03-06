import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { lastValueFrom, Observable } from 'rxjs';
import { UserSaveRequestDTO } from 'src/app/core/interface/user-interface';
import { AdministratorsService } from 'src/app/core/services/api/administrators.service';
import { MessageService } from 'src/app/core/services/api/message.service';
import { UserService } from 'src/app/core/services/api/user.service';

@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.page.html',
  styleUrls: ['./administrators.page.scss'],
  standalone: false
})
export class AdministratorsPage implements OnInit {
  pages: number = 0;
  size: number = 10;
  text: string = '';
  administrators: any[] = [];
  pageResponse: any;

  constructor(private administratorsService: AdministratorsService, private navCtrl: NavController, private messageService: MessageService) { }


  ngOnInit() {
    this.administrators= [];
    this.chargeInformation();
  }

  async search() {
    this.chargeInformation();
  }

  async chargeInformation() {
    this.administratorsService.getAdministrators(this.pages, this.size, this.text).subscribe((data: any) => {
      this.pageResponse = data;

      this.administrators = data.content;
    });
  }

  async onIonInfinite(event: any) {

    if ((this.pageResponse.totalPages - 1) <= this.pages) {
      event.target.complete();
      return;
    }

    this.pages++;
    console.log(this.pages);
    this.chargeInformation();
    event.target.complete();
  }

}
