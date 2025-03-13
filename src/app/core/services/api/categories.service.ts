import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  apiUrl: string;

  constructor(public http: HttpClient) {
    this.apiUrl = URL_API;
  }

  registerCategory(category: any) {
    if(category.id) {
      return this.updateCategory(category);
    }
    return this.http.post(`${this.apiUrl}/category/register`, category);
  }

  updateCategory(category: any) {
    return this.http.put(`${this.apiUrl}/category/update/${category.id}`, category);
  }

  deleteCategory(idCategory: any) {
    return this.http.delete(`${this.apiUrl}/category/delete/${idCategory}`);
  }

 getcategory(page: number, size: number, text: string) {
  const urlLocal = text ? `${this.apiUrl}/category/all?page=${page}&size=${size}&text=${text}` : `${this.apiUrl}/category/all?page=${page}&size=${size}`;
   return this.http.get(urlLocal);
 }

}
