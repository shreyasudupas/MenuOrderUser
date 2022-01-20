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
    state: RouterStateSnapshot): Promise<boolean> | boolean {

      var isAuthenticated = false;
      this.auth.isAuthenticated().then(result => {
        isAuthenticated = result;

        if(isAuthenticated){
          //check if the user has the role appUser
          if(this.auth.UserIsAppUser()){
            isAuthenticated = true;
            return true;
          }
          else{
            return this.router.navigate(['/forbidden']);
          }
        }else{
          return isAuthenticated;
        }
      });
      return isAuthenticated;
  }
}
