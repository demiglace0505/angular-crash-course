import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductDataService {
  constructor(private _httpClient: HttpClient) {}

  public getProducts(): any {
    return this._httpClient.get('localhost:8080/api/products/');
  }
}
