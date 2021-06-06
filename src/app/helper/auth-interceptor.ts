import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './Autho.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var token = this.auth.getToken();

    if(token){
      request = request.clone({ setHeaders:{Authorization:'Bearer '+ token }});
    }

    if (!request.headers.has('Content-Type')) {
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    var userInfo = this.auth.getUserInformation();
    if(userInfo){
      request = request.clone({headers: request.headers.set('UserInfo',JSON.stringify(userInfo))});
    }
   
    return next.handle(request);
  }
}