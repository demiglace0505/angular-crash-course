import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReversepipePipe } from './pipes/reversepipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ReversepipePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
