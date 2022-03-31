import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'PIpes';
  myDate: Date = new Date();
  myMoney: number = 1200;
  myObj = {
    name: 'Doge',
    salary: 1000,
  };
  myNumber: number = 1000.12345;
  stock: number = 3.5;
  numbers: number[] = [10, 20, 30, 40, 50];
  promiseResponse: any;
  promise: Promise<any>;

  constructor() {
    this.promise = this.getPromise();
  }

  getPromise() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('Hello Doge'), 2000);
    });
  }
}
