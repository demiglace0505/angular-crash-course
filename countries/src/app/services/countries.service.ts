import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private _httpClient: HttpClient) {}

  public getCountries(): any {
    return this._httpClient.get(
      'http://api.countrylayer.com/v2/all?access_key=d11538edcd2cc40fc1c8ea41d48b2bb0'
    );
  }
}
