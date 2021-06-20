import { Injectable } from '@angular/core';
import {environment as env } from '../../environments/environment';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { UserInfo } from '../Models/UserProfile';
import { DataSharingService } from '../Services/data-sharing.service';

@Injectable({
    providedIn:'root'
})

export class AuthService {

  
  requestedScopes: string = 'openid profile read:timesheets create:timesheets';

  auth0 = new auth0.WebAuth({
    clientID: env.auth.clientId,
    domain: env.auth.domain,
    responseType: 'token id_token',
    audience: env.auth.audience,
    redirectUri: env.auth.redirectUri,
    scope:'openid profile email profile:user profile:admin'
  });

  constructor(public router: Router,private share:DataSharingService) {}

  public login(): void {
    this.auth0.authorize();
  }

 
  public handleAuthentication():Promise<string> {

    return new Promise((resolve,reject)=>{

      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          this.setSession(authResult);
          //this.router.navigateByUrl('/user');
          this.getUserProfile(authResult);
          resolve('success');
        } else if (err) {
          
          console.log(err);
          alert('Error: <%= "${err.error}" %>. Check the console for further details.');
          reject(err);
        }
      });
    });
    
  }


  private setSession(authResult:any): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

    // If there is a value on the scope param from the authResult,
    // use it to set scopes in the session for the user. Otherwise
    // use the scopes as requested. If no scopes were requested,
    // set it to nothing
    const scopes = authResult.scope || this.requestedScopes || '';

    sessionStorage.setItem('access_token', authResult.accessToken);
    sessionStorage.setItem('id_token', authResult.idToken);
    sessionStorage.setItem('expires_at', expiresAt);
    sessionStorage.setItem('scopes', JSON.stringify(scopes));
  }

  public logout(): void {
    //chek if it contains the session value
    let session_variables:boolean = false;
    if(sessionStorage.getItem('access_token')!=null){
      session_variables = true;
    }
    // Remove tokens and expiry time from localStorage
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('id_token');
    sessionStorage.removeItem('expires_at');
    sessionStorage.removeItem('scopes');
    sessionStorage.removeItem('userInfo');

    //logout from app only if it contains the session variables
    if(session_variables){
        //logout from auth0 Application
        this.auth0.logout({
          clientID:env.auth.clientId,
          returnTo:env.auth.redirectUri
        });
    }
    
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(sessionStorage.getItem('expires_at')||'0');
    return new Date().getTime() < expiresAt;
  }

  public userHasScopes(scopes: Array<string>): boolean {
    const grantedScopes = JSON.parse(sessionStorage.getItem('scopes')||'{}').split(' ');
    return scopes.every(scope => grantedScopes.includes(scope));
  }

  public getUserProfile(authresult:auth0.Auth0DecodedHash){
      var user = authresult.idTokenPayload;
      let userProfile = new UserInfo();
      if(user!=null){
        userProfile.username = user.email;
        userProfile.pictureLocation = user.picture;
        userProfile.nickname = user.nickname;
        var userSession = JSON.stringify(userProfile);
        sessionStorage.setItem('userInfo',userSession);
      }
  }

  getUserInformation():UserInfo{
    let userProfile = new UserInfo();
    let getuserDetails = JSON.parse(sessionStorage.getItem('userInfo')||'{}');
    userProfile = getuserDetails;
    return userProfile;
  }

  getToken(){
    return sessionStorage.getItem('access_token');
  }

}