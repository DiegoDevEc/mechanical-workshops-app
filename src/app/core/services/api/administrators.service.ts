import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API, URL_PUBLIC_API} from '../../constants';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministratorsService {

  apiUrl: string;

  constructor(public http: HttpClient) {
    this.apiUrl = URL_API;
  }

  registerAdministrator(user: any) {
    return this.http.post(`${this.apiUrl}/users/register`, user);
  }

 getAdministrators(page: number, size: number, text: string) {
  const urlLocal = text ? `${this.apiUrl}/administrator/all?page=${page}&size=${size}&text=${text}` : `${this.apiUrl}/administrator/all?page=${page}&size=${size}`;
   return this.http.get(urlLocal);
 }

}
