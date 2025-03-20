import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  apiUrl: string;

  constructor(public http: HttpClient) {
    this.apiUrl = URL_API;
  }

  updateAppointments(appointment: any, serviceId: any, technicalId: any) {
    const data = {
      serviceId: serviceId,
      technicalId: technicalId
    };
    return this.http.put(`${this.apiUrl}/appointments/update-assigned/${appointment.id}`, data);
  }

  deleteAppointments(appointmentId: any) {
    return this.http.delete(`${this.apiUrl}/appointments/delete/${appointmentId}`);
  }

  getAppointments(page: number, size: number, startDate: string, endDate: string) {
    const urlLocal = `${this.apiUrl}/appointments/all?page=${page}&size=${size}&startDate=${startDate}&endDate=${endDate}`;
     return this.http.get(urlLocal);
   }
}
