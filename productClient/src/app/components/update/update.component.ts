import { Component, OnInit } from '@angular/core';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  public updateResponse: any;
  public id!: number;
  public name!: string;
  public price!: number;
  constructor(private _service: ProductDataService) {}

  ngOnInit(): void {}

  public updateProduct(product: any) {
    this._service.update(product).subscribe((res: any) => {
      this.updateResponse = res;
    });
  }
}
