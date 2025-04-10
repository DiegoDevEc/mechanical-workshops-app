import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../../constants';
import { AttendanceDashboardFilter } from '../../interface/attendance-dashboard-filter-interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiUrl: string;

  constructor(public http: HttpClient) {
    this.apiUrl = URL_API;
  }

  getDashboardByTechnician(attendanceDashboardFilter: AttendanceDashboardFilter) {
    const urlLocal = `${this.apiUrl}/dashboard/technician`;
    return this.http.post(urlLocal, attendanceDashboardFilter);
  }

  getDashboardByAdministrator(attendanceDashboardFilter: AttendanceDashboardFilter) {
    const urlLocal = `${this.apiUrl}/dashboard/administrator`;
    return this.http.post(urlLocal, attendanceDashboardFilter);
  }

  getDashboardByClient(attendanceDashboardFilter: AttendanceDashboardFilter) {
    const urlLocal = `${this.apiUrl}/dashboard/client`;
    return this.http.post(urlLocal, attendanceDashboardFilter);
  }

}
