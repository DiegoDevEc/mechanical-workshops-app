import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class TechnicialService {

  apiUrl: string;

  constructor(public http: HttpClient) {
    this.apiUrl = URL_API;
  }

  registerTechnician(user: any) {
    user.mustChangePassword = true;
    if(user.id) {
      return this.updateTechnician(user);
    }
    return this.http.post(`${this.apiUrl}/technician/register`, user);
  }

  updateTechnician(user: any) {
    return this.http.put(`${this.apiUrl}/technician/update/${user.id}`, user);
  }

  deleteTechnician(idUser: any) {
    return this.http.delete(`${this.apiUrl}/technician/delete/${idUser}`);
  }

 getTechnician(page: number, size: number, text: string) {
  const urlLocal = text ? `${this.apiUrl}/technician/all?page=${page}&size=${size}&text=${text}` : `${this.apiUrl}/technician/all?page=${page}&size=${size}`;
   return this.http.get(urlLocal);
 }
}
