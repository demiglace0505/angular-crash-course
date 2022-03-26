import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CountriesComponent } from './components/countries/countries.component';
import { CountriesService } from './services/countries.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, CountriesComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [CountriesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
