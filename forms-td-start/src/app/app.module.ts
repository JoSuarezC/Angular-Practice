import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FocusFirstInvalidInputDirective } from 'src/app/focus-first-invalid-input.directive';

@NgModule({
  declarations: [
    AppComponent,
    FocusFirstInvalidInputDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
