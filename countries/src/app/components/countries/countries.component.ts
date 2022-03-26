import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  public data: any;

  constructor(private _service: CountriesService) {}

  ngOnInit(): void {
    return this._service.getCountries().subscribe(
      (response: any) => {
        this.data = response;
        console.log(response);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
