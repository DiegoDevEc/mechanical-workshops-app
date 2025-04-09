import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  apiUrl: string;

  constructor(public http: HttpClient) {
    this.apiUrl = URL_API;
  }

  registerClient(user: any) {
    user.mustChangePassword = true;
    if(user.id) {
      return this.updateClient(user);
    }
    return this.http.post(`${this.apiUrl}/clients/register`, user);
  }

  updateClient(user: any) {
    return this.http.put(`${this.apiUrl}/clients/update/${user.id}`, user);
  }

  deleteClient(idUser: any) {
    return this.http.delete(`${this.apiUrl}/clients/delete/${idUser}`);
  }

 getClients(page: number, size: number, text: string) {
  const urlLocal = text ? `${this.apiUrl}/clients/all?page=${page}&size=${size}&text=${text}` : `${this.apiUrl}/clients/all?page=${page}&size=${size}`;
   return this.http.get(urlLocal);
 }
}
