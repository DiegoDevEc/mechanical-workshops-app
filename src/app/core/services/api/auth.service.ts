import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API, URL_PUBLIC_API} from '../../constants';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string;

  constructor(public http: HttpClient) {
    this.apiUrl = URL_API + URL_PUBLIC_API;
  }

  loginUser(user: any) {
    return this.http.post(`${this.apiUrl}/auth/login`, user);
  }

}
