import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsAvailableService {

  apiUrl: string;

  constructor(public http: HttpClient) {
    this.apiUrl = URL_API;
  }

  updateAppointments(user: any) {
    return this.http.put(`${this.apiUrl}/appointment-available/update/${user.id}`, user);
  }

  deleteAppointments(idUser: any) {
    return this.http.delete(`${this.apiUrl}/appointment-available/delete/${idUser}`);
  }

  getAppointments(page: number, size: number, text: string) {
    const urlLocal = text ? `${this.apiUrl}/appointment-available/all?page=${page}&size=${size}&text=${text}` : `${this.apiUrl}/appointment-available/all?page=${page}&size=${size}`;
    return this.http.get(urlLocal);
  }

  getAppointmentsDaysAll() {
    const urlLocal = `${this.apiUrl}/appointment-available/all-available-days`
    return this.http.get(urlLocal);
  }

  getAppointmentsTimesAll(dateSelected: string) {
    const urlLocal = `${this.apiUrl}/appointment-available/all-available-times/${dateSelected}`
    return this.http.get(urlLocal);
  }
}
