import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API, URL_PUBLIC_API} from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class AdministratorsService {

  apiUrl: string;

  constructor(public http: HttpClient) {
    this.apiUrl = URL_API;
  }

  registerAdministrator(user: any) {
    if(user.id) {
      return this.updateAdministrator(user);
    }
    return this.http.post(`${this.apiUrl}/administrator/register`, user);
  }

  updateAdministrator(user: any) {
    return this.http.put(`${this.apiUrl}/administrator/update/${user.id}`, user);
  }

  deleteAdministrator(idUser: any) {
    return this.http.delete(`${this.apiUrl}/administrator/delete/${idUser}`);
  }

 getAdministrators(page: number, size: number, text: string) {
  const urlLocal = text ? `${this.apiUrl}/administrator/all?page=${page}&size=${size}&text=${text}` : `${this.apiUrl}/administrator/all?page=${page}&size=${size}`;
   return this.http.get(urlLocal);
 }

}
