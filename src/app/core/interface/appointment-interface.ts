export interface Appointment {
  id:                   string;
  client:               User;
  vehicle:              Vehicle;
  dateAppointment:      Date;
  status:               string;
  availableAppointment: AvailableAppointment;
  statusAttendance:     string;
  technician:           User;
}

export interface AvailableAppointment {
  id:            string;
  dateAvailable: Date;
  timeAvailable: string;
  dayOfWeek:     string;
}

export interface User {
  id:             string;
  firstname:      string;
  lastname:       string;
  address:        string;
  username:       null | string;
  identification: null | string;
  phone:          null | string;
  email:          null | string;
  personId:       string;
}

export interface Vehicle {
  id:       string;
  clientId: string;
  brand:    string;
  model:    string;
  year:     number;
  plate:    string;
}
