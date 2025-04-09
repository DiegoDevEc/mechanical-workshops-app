import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

  apiUrl: string;

  constructor(public http: HttpClient, private authService: AuthService) {
    this.apiUrl = URL_API;
  }

  async getVehicules() {
    const user: any = await this.authService.getUserData();
    const clientId = user.keyId;
    return this.http.get(`${this.apiUrl}/vehicles/all?clientId=${clientId}`).toPromise();
  }

  registerVehicule(vehicule: any) {
    if (vehicule.id) {
      return this.updateProduct(vehicule);
    }
    return this.http.post(`${this.apiUrl}/vehicles/register`, vehicule);
  }

  updateProduct(vehicule: any) {
    return this.http.put(`${this.apiUrl}/vehicles/update/${vehicule.id}`, vehicule);
  }

  deleteProduct(idvehicule: any) {
    return this.http.delete(`${this.apiUrl}/vehicles/delete/${idvehicule}`);
  }

}
