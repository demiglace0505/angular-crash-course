import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UppercaseConverterService {
  constructor(private _httpClient: HttpClient) {}

  public convertToUppercase(obj: any): any {
    return this._httpClient.post(
      'http://test-routes.herokuapp.com/test/uppercase',
      obj
    );
  }
}
