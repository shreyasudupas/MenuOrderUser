import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/helper/service/Autho.service';
import { BaseComponent } from 'src/app/shared/component/base-component';
import { APIResponse } from 'src/app/Models/api-response/APIResponse';
import { UserInfo } from 'src/app/Models/user/UserProfile';
import { DataSharingService } from 'src/app/Services/data-sharing.service';
import { MenuService } from 'src/app/Services/menu.service';
import { ResourceService } from 'src/app/Services/Resouce.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-loginlogout',
  templateUrl: './loginlogout.component.html',
  styleUrls: ['./loginlogout.component.css']
})
export class LoginlogoutComponent extends BaseComponent<APIResponse> implements OnInit {
 
  progressspinner=true;
  @ViewChild('logOutButton') logoutRef:ElementRef;
  @ViewChild('loggedOut') loginRef:ElementRef;
  userInfo:UserInfo;
  static i=0;

  constructor(private router: Router,private auth:AuthService,private zone:NgZone,public client:HttpClient,
    public _menuService:MenuService,public _broadcastService:DataSharingService) { 
    super(_menuService,client,_broadcastService);
  }

  ngOnInit(): void {
    this.versionUrl = env.basketAPI;
    this.action = "StoreUserKeyValue";

    if(!this.auth.isAuthenticated()){
      //add the loading param
      this.progressspinner = false;
      this.auth.handleAuthentication().then((result)=>{
        console.log(result);
        if(result != undefined){
          //this.userInfo = this.auth.getUserInformation();
          //call the basket service to store the user cache
          //this.createItem(result).toPromise().then(response=>console.log(response));
          this.Create(result).toPromise().then(response=>console.log(response));
        }
        LoginlogoutComponent.i+=1; //counter to keep track of home may times page have loaded
        this.refreshPage();
        this.progressspinner = true;
      });
    }else{
      //This is called again because we need the userInfo once the page reload haappens 
      //this.userInfo = this.auth.getUserInformation(); 
    }

  }

  ngAfterViewInit():void{
    this.refreshPage();
  }

  refreshPage(){
    if(this.auth.isAuthenticated()){
      //console.log(this.logoutRef.nativeElement.innerHTML);
      this.logoutRef.nativeElement.hidden = false
      this.loginRef.nativeElement.hidden = true;

      // //if url is base url then only navigate other wise it will navigate irrespective of explicity routing to that route
      if((window.location.href == (window.location.origin+'/#')) || (window.location.href == (window.location.origin+'/'))){

        // if(this.auth.userHasScopes(['profile:user'])){
        //   this.zone.run(()=>{
        //     this.router.navigate(['user']);
        //   }); 
        //   if(LoginlogoutComponent.i == 1)//temp fix since its not routing
        //     location.reload();
        // }
      }
    }else{
      this.logoutRef.nativeElement.hidden = true;
      this.loginRef.nativeElement.hidden = false;

      //console.log(window.location);
      //then logout from this
      this.auth.logout();
      this.router.navigate(['/']);
      
    }
  }

  navigateToDashboad(path:string):void{
    //this.auth.login();
    //for developement purposes only
    let user = { username:"admin@test.com",password:"admin@123"};
    //this.auth.authenticateUserDevelopment(user);
  }

  logout():void{
    this.auth.logout();
  }

}
