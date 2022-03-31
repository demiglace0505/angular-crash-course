import { Component, OnInit } from '@angular/core';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-fetch',
  templateUrl: './fetch.component.html',
  styleUrls: ['./fetch.component.css'],
})
export class FetchComponent implements OnInit {
  public getProductResponse: any;
  public id!: number;
  constructor(private _service: ProductDataService) {}

  ngOnInit(): void {}

  public getProduct(id: number) {
    this._service.getProduct(id).subscribe((res: any) => {
      this.getProductResponse = res;
    });
  }
}
