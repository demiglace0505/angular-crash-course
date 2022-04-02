import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CheckinService {
  reservationUrl: string = 'http://localhost:8080/flightservices/reservations/';
  reservationData: any;
  constructor(private _httpClient: HttpClient) {}

  public getReservation(id: number): any {
    return this._httpClient.get(`${this.reservationUrl}${id}`);
  }

  public checkIn(checkInRequest: any): any {
    return this._httpClient.put(this.reservationUrl, checkInRequest);
  }
}
