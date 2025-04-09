import { ChangePasswordPage } from './../../../pages/change-password/change-password.page';
import { AuthRequestDto, AuthResponseDto } from './../../interface/user-interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API, URL_PUBLIC_API } from '../../constants';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private _storage: Storage | null = null;
  apiUrl: string;

  constructor(public http: HttpClient, private storage: Storage) {
    this.apiUrl = URL_API + URL_PUBLIC_API;
    this.init(); // Inicializar Storage correctamente
  }

  async init() {
    this._storage = await this.storage.create();
  }

  loginUser(authRequestDto: AuthRequestDto) {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/auth/login`, authRequestDto);
  }

  async ChangePassword(newPassword: string) {
    const userData = await this.getUserData();
    const email = userData.email;

    return this.http.post(`${this.apiUrl}/auth/change-password`, { newPassword, email });
  }

  // ✅ Guardar token
  async saveToken(token: string) {
    if (!this._storage) {
      await this.init();
    }
    await this._storage?.set('token', token);
  }

  // ✅ Obtener token
  async getToken(): Promise<string | null> {
    if (!this._storage) {
      await this.init();
    }
    return await this._storage?.get('token');
  }

  // ✅ Decodificar token JWT y obtener datos del usuario
  async getUserData(): Promise<any> {
    const token = await this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }

  // ✅ Obtener rol del usuario
  async getUserRole(): Promise<string> {
    const userData = await this.getUserData();
    return userData?.roles[0]?.authority || '';
  }

  // ✅ Logout: Eliminar token
  async logout() {
    if (!this._storage) {
      await this.init();
    }
    await this._storage?.remove('token');
  }
}
