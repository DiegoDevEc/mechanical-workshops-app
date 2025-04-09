import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API, URL_PUBLIC_API} from '../../constants';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string;

  constructor(public http: HttpClient) {
    this.apiUrl = URL_API + URL_PUBLIC_API;
  }

  registerUser(user: any) {
    user.mustChangePassword = false;
    return this.http.post(`${this.apiUrl}/users/register`, user);
  }

  checkPhoneNumber(phone: string, userId: any) {
    if (!phone) {
      return throwError(() => new Error('El número de teléfono no puede ser null o undefined'));
    }

    const urlValidated = userId
      ? `${this.apiUrl}/users/validate/phone?phone=${phone}&userId=${userId}`
      : `${this.apiUrl}/users/validate/phone?phone=${phone}`;

    return this.http.get<any>(urlValidated).pipe(
      tap((res) => console.log('✅ Respuesta de API recibida:', res)),
      catchError((error) => {
        console.error('❌ Error en la API:', error);
        return throwError(() => error);
      })
    );
  }


  checkIdentification(identification: string, userId: any) {
    const urlValidated = userId ? `${this.apiUrl}/users/validate/identification?identification=${identification}&userId=${userId}` : `${this.apiUrl}/users/validate/identification?identification=${identification}`;
    return this.http.get<any>(urlValidated);
  }

  checkEmail(email: string, userId: any) {
    const urlValidated = userId ? `${this.apiUrl}/users/validate/email?email=${email}&userId=${userId}` : `${this.apiUrl}/users/validate/email?email=${email}`;
    return this.http.get<any>(urlValidated);
  }

  checkUsername(username: string, userId: any) {
    const urlValidated = userId ? `${this.apiUrl}/users/validate/username?username=${username}&userId=${userId}` : `${this.apiUrl}/users/validate/username?username=${username}`;
    return this.http.get<any>(urlValidated);
  }
}
