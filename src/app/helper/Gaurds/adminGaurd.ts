import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/Autho.service';

@Injectable({
    providedIn:'root'
})

export class AdminGaurd implements CanActivate{
    constructor(private auth:AuthService
        ,private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        const roles = route.data['roles'] as Array<string>;

        if(!roles){
            return this.checkIfUserIsAuthenticated();
        }else{
            return this.checkForUserAdmin();
        }   
    }

    private checkIfUserIsAuthenticated(){
        return this.auth.isAuthenticated().then(res=>{
          return res? true: this.redirectToUnAuthorized();
        })
      }
    
      
    private checkForUserAdmin(){
        return this.auth.CheckIfAdmin()
          .then( res => {
            return res ? true: this.redirectToUnAuthorized();
          })
      }
    
      private redirectToUnAuthorized(){
        this.router.navigate(['/forbidden'])
        return false;
      }
    
}