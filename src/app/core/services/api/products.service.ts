import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrl: string;

  constructor(public http: HttpClient) {
    this.apiUrl = URL_API;
  }

  registerProduct(product: any) {
    if(product.id) {
      return this.updateProduct(product);
    }
    return this.http.post(`${this.apiUrl}/products/register`, product);
  }

  updateProduct(product: any) {
    return this.http.put(`${this.apiUrl}/products/update/${product.id}`, product);
  }

  deleteProduct(idProduct: any) {
    return this.http.delete(`${this.apiUrl}/products/delete/${idProduct}`);
  }

 getProduct(page: number, size: number, text: string) {
  const urlLocal = text ? `${this.apiUrl}/products/all?page=${page}&size=${size}&text=${text}` : `${this.apiUrl}/products/all?page=${page}&size=${size}`;
   return this.http.get(urlLocal);
 }

}
