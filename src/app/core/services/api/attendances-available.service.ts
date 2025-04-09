import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class AttendancesService {

  apiUrl: string;

  constructor(public http: HttpClient) {
    this.apiUrl = URL_API;
  }

  updateAttendance(attendance: any) {
    return this.http.put(`${this.apiUrl}/attendances/update/${attendance.id}`, attendance);
  }

  updateAttendanceIngress(attendanceId: any) {
    return this.http.put(`${this.apiUrl}/attendances/update-ingress/${attendanceId}`, {});
  }

  updateAttendanceFinalize(attendanceId: any, attendance: any) {
    return this.http.put(`${this.apiUrl}/attendances/update-finalize-service/${attendanceId}`, attendance);
  }

  deleteAttendance(attendanceId: any) {
    return this.http.delete(`${this.apiUrl}/attendances/cancel/${attendanceId}`);
  }

  getAttendancesByClient(clientId:string, page: number, size: number, status?:string) {
    const urlLocal = `${this.apiUrl}/attendances/all-by-client?clientId=${clientId}&page=${page}&size=${size}&status=${status}`;
    return this.http.get(urlLocal);
  }

  getAttendancesByTechnical(technicianId: string, page: number, size: number, text: string) {
    const urlLocal = text ? `${this.apiUrl}/attendances/all-by-technical-assigned?technicianId=${technicianId}&page=${page}&size=${size}&status=${text}` :
     `${this.apiUrl}/attendances/all-by-technical-assigned?technicianId=${technicianId}&page=${page}&size=${size}`;
    return this.http.get(urlLocal);
  }

  getAttendancesByTechnicalAssignated(technicianId: string, page: number, size: number, text: string) {
    const urlLocal = text ? `${this.apiUrl}/attendances/all-by-technical-assigned?technicianId=${technicianId}&page=${page}&size=${size}&status=${text}` :
     `${this.apiUrl}/attendances/all-by-technical-assigned?technicianId=${technicianId}&page=${page}&size=${size}`;
    return this.http.get(urlLocal);
  }

}
