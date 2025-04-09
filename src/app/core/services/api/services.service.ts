import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  apiUrl: string;

  constructor(public http: HttpClient) {
    this.apiUrl = URL_API;
  }

  registerService(service: any) {
    if(service.id) {
      return this.updateService(service);
    }
    return this.http.post(`${this.apiUrl}/services/register`, service);
  }

  updateService(service: any) {
    return this.http.put(`${this.apiUrl}/services/update/${service.id}`, service);
  }

  deleteService(idService: any) {
    return this.http.delete(`${this.apiUrl}/services/delete/${idService}`);
  }

 getService(page: number, size: number, text: string) {
  const urlLocal = text ? `${this.apiUrl}/services/all?page=${page}&size=${size}&text=${text}` : `${this.apiUrl}/services/all?page=${page}&size=${size}`;
   return this.http.get(urlLocal);
 }

}
