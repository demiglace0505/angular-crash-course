import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MyIfDirective } from './directives/my-if.directive';
import { MyLoopDirective } from './directives/my-loop.directive';
import { MyStylesDirective } from './directives/my-styles.directive';

@NgModule({
  declarations: [
    AppComponent,
    MyIfDirective,
    MyLoopDirective,
    MyStylesDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
