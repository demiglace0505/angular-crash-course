import { Component } from '@angular/core';
import { ProductDataService } from './services/product-data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public products: any;
  constructor(private _service: ProductDataService) {}

  ngOnInit() {
    this._service.getProducts().subscribe((res: any) => {
      this.products = res;
    });
  }
}
