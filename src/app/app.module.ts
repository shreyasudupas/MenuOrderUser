import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PrimeNGModule } from "../app/primeng.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginlogoutComponent } from './OtherComponents/loginlogout/loginlogout.component';
//import { AuthModule } from '@auth0/auth0-angular';
//import { environment as env } from '../environments/environment';
import { AuthInterceptor } from './helper/interceptor/auth-interceptor';
import { GlobalErrorHandler } from './shared/error/GlobalErrorHandler';
import { LoginComponent } from './OtherComponents/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginlogoutComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNGModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    //add and intilize AuthModule
    // AuthModule.forRoot({
    //   ...env.auth,
    // })
  ],
  providers: [/*DataServiceService*/
    { provide: ErrorHandler,useClass:GlobalErrorHandler},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
