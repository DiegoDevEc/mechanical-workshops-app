import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservationState = new BehaviorSubject<any>({
    step: 1,
    dateTime: null,
    service: null,
  });

  currentState = this.reservationState.asObservable();

  constructor() {}

  setDateTime(dateTime: any) {
    const current = this.reservationState.value;
    this.reservationState.next({...current, dateTime, step: 2});
  }

  setVehicule(vehicule: any) {
    const current = this.reservationState.value;
    this.reservationState.next({...current, vehicule, step: 3});
  }

  setService(service: any) {
    const current = this.reservationState.value;
    this.reservationState.next({...current, service, step: 4});
  }

  resetReservation() {
    this.reservationState.next({
      step: 1,
      dateTime: null,
      vehicule: null,
      service: null,
    });
  }

  getState() {
    return this.reservationState.value;
  }
}
