import { CategoriesService } from 'src/app/core/services/api/categories.service';
import { ProductsService } from './../../../../core/services/api/products.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonList, IonModal, LoadingController, NavController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { ProductSaveRequestDto } from 'src/app/core/interface/product-interface';
import { MessageService } from 'src/app/core/services/api/message.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: false
})
export class ProductsPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild(IonList) ionList!: IonList;

  pages: number = 0;
  size: number = 10;
  text: string = '';
  products: any[] = [];
  categories: any[] = [];

  pageResponse: any;

  productsForm: FormGroup;
  message: string = '';
  isProblemServer = false

  title = 'Registrar';

  isUpdate: any;
  idProduct: string | undefined;

  constructor(private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private fb: FormBuilder,
    private messageService: MessageService) {
    this.productsForm = this.initForm();
  }

  initForm() {
    if (this.productsForm) {
      this.productsForm.reset();
    }
    return this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      categoryId: ['', Validators.required],
    });

  }

  async ngOnInit() {
    this.products = [];
    this.chargeInformation();
    this.loadCategories();
  }

  async loadCategories() {
    try {
      this.categories = (await this.categoriesService.getCategoriesAllActives().toPromise())?.data;

      console.log('Categorías cargadas:', this.categories);

    } catch (error) {
      console.error('Error al cargar categorías:', error);
      this.messageService.presentToast('Error al cargar las categorías', 'danger');
    }
  }

  async search() {
    if (this.text.length >= 3 || this.text.length === 0) {
      this.pages = 0;
      this.products = [];
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
      const data: any = await this.productsService.getProduct(this.pages, this.size, this.text).toPromise();
      this.pageResponse = data;
      this.products = data.content;
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

  deleteProduct(id: string){
    this.productsService.deleteProduct(id).subscribe(
      (response) => {
        console.log('✅ Producto eliminado:', response);
        this.messageService.presentToast('Producto eliminado exitosamente', 'success');
        this.chargeInformation();
      },
      (error) => {
        console.error('❌ Error al eliminar Producto:', error);
        this.messageService.presentToast('Producto NO eliminado', 'danger');
      }
    )
    };

    updateProduct(product: any) {
    if (!product) {
      console.error('Error: La Producto es indefinido o nulo');
      return;
    }
    this.title = 'Actualizar';
    this.isUpdate = true;
    this.idProduct = product.id;
    this.productsForm.patchValue(product);
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
        this.idProduct = undefined;
      }
      this.initForm();
    }
  }

  async register() {

    if (this.productsForm.invalid) {
      return;
    }

    const productData : ProductSaveRequestDto = {
      id: undefined,
      name: this.productsForm.value.name,
      description: this.productsForm.value.description,
      price: this.productsForm.value.price,
      stock: this.productsForm.value.stock,
      categoryId: this.productsForm.value.categoryId,
      sku: undefined
    };

    if (this.isUpdate) {
      productData.id = this.idProduct;
    }

    this.productsService.registerProduct(productData).subscribe(
      (response) => {
        console.log('✅ Producto registrado:', response);
        this.productsForm.reset();
        this.messageService.presentToast('Producto registrado exitosamente', 'success');
        this.chargeInformation();
      },
      (error) => {
        console.error('❌ Error al registrar Producto:', error);
        this.messageService.presentToast('Producto NO registrado', 'danger');
      }
    );

  }

}
