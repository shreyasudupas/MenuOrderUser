import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PrimeNGModule } from "../app/primeng.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './Component/home/home.component';
import { VendorListComponent } from './Component/vendor-list/vendor-list.component';
import { DataServiceService } from './Services/data-service.service';
import { MenuBarComponent } from './Component/menu-bar/menu-bar.component';
import { MenuListDisplayComponent } from './Component/menu-list-display/menu-list-display.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VendorListComponent,
    MenuBarComponent,
    MenuListDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNGModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
