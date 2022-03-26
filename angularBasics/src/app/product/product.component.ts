import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: any[];

  constructor() {
    this.products = [
      {
        id: '1',
        name: 'Macbook',
      },
      {
        id: '2',
        name: 'Legion',
      },
    ];
  }

  public getProducts() {
    return this.products;
  }

  ngOnInit(): void {}
}
