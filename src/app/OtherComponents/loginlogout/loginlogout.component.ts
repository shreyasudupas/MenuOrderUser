import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/helper/Autho.service';
import { APIResponse } from 'src/app/Models/APIResponse';
import { UserInfo } from 'src/app/Models/UserProfile';
import { ResourceService } from 'src/app/Services/Resouce.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-loginlogout',
  templateUrl: './loginlogout.component.html',
  styleUrls: ['./loginlogout.component.css']
})
export class LoginlogoutComponent extends ResourceService<APIResponse> implements OnInit {
  getVersionUrl(): string {
    return env.basketAPI;
  }
  actionName(): string {
    return "StoreUserKeyValue";
  }
  progressspinner=true;
  @ViewChild('logOutButton') logoutRef:ElementRef;
  @ViewChild('loggedOut') loginRef:ElementRef;
  userInfo:UserInfo;
  static i=0;

  constructor(private router: Router,private auth:AuthService,private zone:NgZone,private client:HttpClient) { 
   super(client,'')
  }

  ngOnInit(): void {

    if(!this.auth.isAuthenticated()){
      //add the loading param
      this.progressspinner = false;
      this.auth.handleAuthentication().then((result)=>{
        console.log(result);
        if(result != undefined){
          //this.userInfo = this.auth.getUserInformation();
          //call the basket service to store the user cache
          this.createItem(result).toPromise().then(response=>console.log(response));
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

        if(this.auth.userHasScopes(['profile:user'])){
          this.zone.run(()=>{
            this.router.navigate(['user']);
          }); 
          if(LoginlogoutComponent.i == 1)//temp fix since its not routing
            location.reload();
        }
      }
    }else{
      this.logoutRef.nativeElement.hidden = true;
      this.loginRef.nativeElement.hidden = false;

      //console.log(window.location);
      //then logout from this
      this.auth.logout();
      
    }
  }

  navigateToDashboad(path:string):void{
    this.auth.login();
  }

  logout():void{
    this.auth.logout();
  }

}
