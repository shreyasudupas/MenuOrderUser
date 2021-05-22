import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PrimeNGModule } from "../app/primeng.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
//import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNGModule,
    BrowserAnimationsModule,
    HttpClientModule
    //FormsModule,
  ],
  providers: [/*DataServiceService*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
