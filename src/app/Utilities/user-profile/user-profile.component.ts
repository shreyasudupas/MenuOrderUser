import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
userRole:string;

  constructor(private authService:AuthService,
    public _menuService:MenuService,
    public http:HttpClient,
    public _broadcastService:DataSharingService) { 
    super(_menuService,http,_broadcastService);
    this.userProfile = new UserInfo();
  }

  ngOnInit(): void {
    
    this.versionUrl = env.IDSUserAPI;
    this.action = 'GetUserInformation';
    
    this.userRole = this.authService.GetUserRole();

    this.GetItem(null).subscribe((user)=>{
      //debugger;
      this.userProfile = user;

      //update in data sharing
      this._broadcastService.updateUserInfo(this.userProfile);

      //update user location
      let userAddress = this.userProfile.address.find(ad=>ad.isActive == true);
      this._broadcastService.updateUserLocality(userAddress.area);
      
      if(this.userProfile.imagePath != null)
        this.userProfile.imagePath = env.idsConfig.imageServerPath + this.userProfile.imagePath;
    });
  }

}
