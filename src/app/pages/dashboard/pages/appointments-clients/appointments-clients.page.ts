import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReservationService } from './services/reservation.service';
import { filter, Subject, takeUntil } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-appointments-clients',
  templateUrl: './appointments-clients.page.html',
  styleUrls: ['./appointments-clients.page.scss'],
  standalone: false
})
export class AppointmentsClientsPage implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();

  currentStep = 1;
  progressValue = 0.33;
  reservationData: any = {};
  private navigationTriggered = false;

  constructor(
    private reservationService: ReservationService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    console.log('AppointmentsClientsPage initialized');

    this.setupRouterListener();
    this.setupReservationListener();
    this.resetComponentState();
  }

  private setupRouterListener() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      this.navigationTriggered = true;
      this.resetComponentState();
    });

    // Manejar el popstate (navegación con botón atrás)
    this.location.subscribe(event => {
      if (event.type === 'popstate' && this.navigationTriggered) {
        this.resetComponentState();
        this.navigationTriggered = false;
      }
    });
  }

  private setupReservationListener() {
    this.reservationService.currentState.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(state => {
      this.currentStep = state.step;
      this.reservationData = state;
      this.updateProgress();
    });
  }

  resetComponentState() {
    console.log('Resetting component state');
    this.currentStep = 1;
    this.progressValue = 0.33;
    this.reservationData = {};
    this.reservationService.resetReservation();
  }

  updateProgress() {
    this.progressValue = this.currentStep / 2;
  }

  onDateTimeSelected(dateTime: any) {
    this.reservationService.setDateTime(dateTime);
  }

  onVehiculeSelected(vehicule: any) {
    this.reservationService.setVehicule(vehicule);
  }

  onServiceSelected(service: any) {
    this.reservationService.setService(service);
  }

  goBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateProgress();
    } else {
      this.router.navigate(['/previous-route']); // Ajusta la ruta según necesites
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
