import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FormLoadComponent } from './form-load/form-load.component';

import { HelperService } from "./shared/helper.service";
@NgModule({
  declarations: [
    AppComponent,
    FormLoadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
