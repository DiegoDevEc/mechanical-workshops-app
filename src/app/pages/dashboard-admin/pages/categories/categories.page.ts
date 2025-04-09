import { OverlayEventDetail } from '@ionic/core/components';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonList, IonModal, LoadingController, NavController } from '@ionic/angular';
import { CategoriesService } from 'src/app/core/services/api/categories.service';
import { MessageService } from 'src/app/core/services/api/message.service';
import { CategorySaveRequestDto } from 'src/app/core/interface/categrory-inteface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false
})
export class CategoriesPage implements OnInit {


  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild(IonList) ionList!: IonList;

  pages: number = 0;
  size: number = 10;
  text: string = '';
  categories: any[] = [];
  pageResponse: any;

  categoriesForm: FormGroup;
  message: string = '';
  isProblemServer = false

  title = 'Registrar';

  isUpdate: any;
  idService: string | undefined;

  constructor(private categoriesService: CategoriesService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private fb: FormBuilder,
    private messageService: MessageService) {
    this.categoriesForm = this.initForm();
  }

  initForm() {
    if (this.categoriesForm) {
      this.categoriesForm.reset();
    }
    return this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

  }

  async ngOnInit() {
    this.categories = [];
    this.chargeInformation();
  }

  async search() {
    if (this.text.length >= 3 || this.text.length === 0) {
      this.pages = 0;
      this.categories = [];
      this.chargeInformation();
    }
  }

  async chargeInformation() {

    const loading = await this.loadingController.create({
      message: 'Cargando información...',
      spinner: 'circular',
    });

    await loading.present();

    try {
      const data: any = await this.categoriesService.getcategory(this.pages, this.size, this.text).toPromise();
      this.pageResponse = data;
      this.categories = data.content;
    } catch (error: any) {
      this.messageService.presentToast('Error al cargar la información: ' + error.error.message, 'danger');
      if (error.error.message.includes('token')) {
        this.navCtrl.navigateRoot('/login');
      }
    } finally {
      await loading.dismiss();
    }
  }


  async onIonInfinite(event: any) {
    if ((this.pageResponse.totalPages - 1) <= this.pages) {
      event.target.complete();
      return;
    }
    this.pages++;
    this.chargeInformation();
    event.target.complete();
  }

  deleteCategory(id: string){
    this.categoriesService.deleteCategory(id).subscribe(
      (response) => {
        console.log('✅ Categoria eliminado:', response);
        this.messageService.presentToast('Categoria eliminado exitosamente', 'success');
        this.chargeInformation();
      },
      (error) => {
        console.error('❌ Error al eliminar Categoria:', error);
        this.messageService.presentToast('Categoria NO eliminado', 'danger');
      }
    )
    };

    updateCategory(category: any) {
    if (!category) {
      console.error('Error: La categoria es indefinido o nulo');
      return;
    }
    this.title = 'Actualizar';
    this.isUpdate = true;
    this.idService = category.id;
    this.categoriesForm.patchValue(category);
    this.modal.present();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.register();
    }
    if (event.detail.role === 'cancel') {
      this.ionList.closeSlidingItems();
      this.isUpdate
      if (this.isUpdate) {
        this.messageService.presentToast('Datos no actualizados', 'warning');
        this.title = 'Registrar';
        this.isUpdate = false;
        this.idService = undefined;
      }
      this.initForm();
    }
  }

  async register() {

    if (this.categoriesForm.invalid) {
      return;
    }

    const serviceData : CategorySaveRequestDto = {
      id: undefined,
      name: this.categoriesForm.value.name,
      description: this.categoriesForm.value.description
    };

    if (this.isUpdate) {
      serviceData.id = this.idService;
    }

    this.categoriesService.registerCategory(serviceData).subscribe(
      (response) => {
        console.log('✅ Categoria registrada:', response);
        this.categoriesForm.reset();
        this.messageService.presentToast('Categoria registrada exitosamente', 'success');
        this.chargeInformation();
      },
      (error) => {
        console.error('❌ Error al registrar categoria:', error);
        this.messageService.presentToast('Categoria NO registrada', 'danger');
      }
    );

  }

}
