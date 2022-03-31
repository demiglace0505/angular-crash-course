import { Component, OnInit } from '@angular/core';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  public deleteResponse: any;
  public id!: number;
  constructor(private _service: ProductDataService) {}

  ngOnInit(): void {}

  public deleteProduct(id: number) {
    this._service.delete(id).subscribe((res: any) => {
      this.deleteResponse = res;
    });
  }
}
