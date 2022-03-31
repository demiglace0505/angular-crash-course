import { Component, OnInit } from '@angular/core';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  public createResponse: any;
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  constructor(private _service: ProductDataService) {}

  ngOnInit(): void {}

  public createProduct(product: any) {
    this._service.create(product).subscribe((res: any) => {
      this.createResponse = res;
    });
  }
}
