import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/Autho.service';

@Injectable({
  providedIn: 'root'
})
export class AppUserGaurd implements CanActivate {
  constructor(private auth:AuthService,private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      debugger;
      const roles = next.data['roles'] as Array<string>;
      if(!roles){
        return this.checkIfUserIsAuthenticated();
      }else{
        return this.checkForAppUser();
      }      
  }

  private checkIfUserIsAuthenticated(){
    return this.auth.isAuthenticated().then(res=>{
      return res? true: this.redirectToUnAuthorized();
    })
  }

  private checkForAppUser(){
    return this.auth.CheckIfUserIsAppUser()
    .then(res=>{
      return res ? true: this.redirectToUnAuthorized();
    })
  }

  private redirectToUnAuthorized(){
    this.router.navigate(['/forbidden'])
    return false;
  }

}
