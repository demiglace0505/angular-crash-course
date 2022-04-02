import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Criteria } from '../model/criteria';
import { Reservation } from '../model/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  flightUrl: string = 'http://localhost:8080/flightservices/flights';
  reservationUrl: string = 'http://localhost:8080/flightservices/reservations';
  data: any;

  constructor(private _httpClient: HttpClient) {}

  public getFlights(criteria: Criteria): any {
    return this._httpClient.get(
      `${this.flightUrl}?from=${criteria.from}&to=${criteria.to}&departureDate=${criteria.departureDate}`
    );
  }

  public getFlight(id: number): any {
    return this._httpClient.get(`${this.flightUrl}/${id}`);
  }

  public saveReservation(reservation: Reservation): any {
    return this._httpClient.post(this.reservationUrl, reservation);
  }
}
