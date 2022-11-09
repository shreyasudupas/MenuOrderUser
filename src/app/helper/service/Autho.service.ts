import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { Router } from '@angular/router';
import { UserInfo } from '../../Models/user/UserProfile';
import { DataSharingService } from '../../Services/data-sharing.service';
import { HttpClient } from '@angular/common/http';
import { User, UserManager, UserManagerSettings } from 'oidc-client';
import { Subject } from 'rxjs';

@Injectable({
    providedIn:'root'
})

export class AuthService {
  private _userManager: UserManager;
  private _user: User = null;
  private userLoginSubject = new Subject<boolean>();

  public loginChanged = this.userLoginSubject.asObservable();

  constructor(public router: Router,private share:DataSharingService,private httpClient:HttpClient) {
      this._userManager = new UserManager(this.idpSettings);
    }


  private get idpSettings() : UserManagerSettings {
      return {
        authority: env.auth.idpAuthority,
        client_id: env.auth.clientId,
        redirect_uri: `${env.auth.clientRoot}/signin-callback`,
        scope: env.auth.scope,
        response_type: "code",
        post_logout_redirect_uri: `${env.auth.clientRoot}/signout-callback`
    }
  }

  public CheckIfUserIsAppUser = (): Promise<boolean> => {
    return this._userManager.getUser()
    .then(user => {
      //return user?.profile.role === "appUser";
      return user?.profile.role === "user";
    });
  }

  public GetUserRole(){
    return this._user?.profile.role;
  }


  getUserInformation():User{
    return this._user;
  }

  getToken(){
    return this._user?.access_token;
  }


  public isAuthenticated = (): Promise<boolean> => {
    return this._userManager.getUser()
    .then(user => {
      debugger
      if(this._user !== user){
        this.userLoginSubject.next(this.checkUser(user));
      }
      this._user = user;
        
      return this.checkUser(user);
    })
  }

  private checkUser = (user : User): boolean => {
    return !!user && !user.expired;
  }

  public login = () => {
    return this._userManager.signinRedirect();
  }

  public finishLogin = (): Promise<User> => {
    return this._userManager.signinRedirectCallback()
    .then(user => {
      debugger
      this._user = user;
      this.userLoginSubject.next(this.checkUser(user));
      return user;
    });
  }

  public logout = () => {
    this._userManager.signoutRedirect();
  }

  public finishLogout = () => {
    this._user = null;
    return this._userManager.signoutRedirectCallback();
  }

}