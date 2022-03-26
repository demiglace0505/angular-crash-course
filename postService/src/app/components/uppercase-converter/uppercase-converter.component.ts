import { Component, OnInit } from '@angular/core';
import { UppercaseConverterService } from 'src/app/services/uppercase-converter.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-uppercase-converter',
  templateUrl: './uppercase-converter.component.html',
  styleUrls: ['./uppercase-converter.component.css'],
})
export class UppercaseConverterComponent implements OnInit {
  public result: any;
  public my_message: any;

  constructor(private _service: UppercaseConverterService) {}

  ngOnInit(): void {}

  public convert(obj: any): any {
    this._service.convertToUppercase(obj).subscribe(
      (res: any) => (this.result = res),
      (err: HttpErrorResponse) => {
        console.error(err);
      }
    );
  }
}
