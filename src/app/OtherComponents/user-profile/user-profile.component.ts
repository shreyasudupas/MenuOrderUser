import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/helper/service/Autho.service';
import { BaseComponent } from 'src/app/shared/component/base-component';
import { UserInfo } from 'src/app/Models/user/UserProfile';
import { DataSharingService } from 'src/app/Services/data-sharing.service';
import { MenuService } from 'src/app/Services/menu.service';
import { environment as env} from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent extends BaseComponent<UserInfo> implements OnInit {
userProfile:UserInfo;
//@Input() InputUserProfile:UserInfo;

  constructor(private authService:AuthService,
    public _menuService:MenuService,
    public http:HttpClient,
    public _broadcastService:DataSharingService) { 
    super(_menuService,http,_broadcastService);
  }

  ngOnInit(): void {
    
    this.versionUrl = env.userAPI;
    this.action = 'GetOrUpdateUserDetails';
    this.userProfile = this.authService.getUserInformation();
    //get the current token
    //this.userProfile = this.InputUserProfile;
    this.Create(this.userProfile).subscribe((response)=>{
      if(response != null){
        this.userProfile.points = response.points;
        this.userProfile.cartAmount = response.cartAmount;
        this.userProfile.roleName = response.roleName;
      }
      
    })
  }

}
