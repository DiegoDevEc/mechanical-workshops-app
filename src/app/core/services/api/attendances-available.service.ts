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

  deleteAttendance(attendanceId: any) {
    return this.http.delete(`${this.apiUrl}/attendances/cancel/${attendanceId}`);
  }

  getAttendancesByClient(clientId:string, page: number, size: number, status?:string) {
    const urlLocal = `${this.apiUrl}/attendances/all-by-client?clientId=${clientId}&page=${page}&size=${size}&status=${status}`;
    return this.http.get(urlLocal);
  }

  getAttendancesByTechnical(technicalId: string, page: number, size: number, text: string) {
    const urlLocal = text ? `${this.apiUrl}/attendances/all-by-technical?clientId=${technicalId}&page=${page}&size=${size}&text=${text}` : `${this.apiUrl}/attendances/all-by-technical?clientId=${technicalId}&page=${page}&size=${size}`;
    return this.http.get(urlLocal);
  }

}
