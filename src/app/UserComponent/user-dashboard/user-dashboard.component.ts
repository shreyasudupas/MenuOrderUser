import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/helper/Autho.service';
import { BaseComponent } from 'src/app/helper/base-component';
import { RequestResource, ResourceServiceForkRequest } from 'src/app/Models/resouce-service/ResourceServiceForkRequest';
import { UserInfo } from 'src/app/Models/user/UserProfile';
import { DataSharingService } from 'src/app/Services/data-sharing.service';
import { MenuService } from 'src/app/Services/menu.service';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent extends BaseComponent<UserInfo> implements OnInit {
 
  UserProfile:UserInfo;
  MenuItems: MenuItem[];
  CurrentUserRole:string;
  

  constructor(private AuthService:AuthService,httpclient:HttpClient,
    public _broadcastService:DataSharingService,
    public _menuService:MenuService) {
    super(_menuService,httpclient,_broadcastService);
   }

  ngOnInit(): void {
    
    this.UserProfile = this.AuthService.getUserInformation();

    this.CurrentUserRole = "user";


      //fork join two  calls
      let forkRequest = new ResourceServiceForkRequest();
      let RequestResource1 = new RequestResource();
      RequestResource1.requestUrl = env.userAPI+'GetOrUpdateUserDetails';
      RequestResource1.httpMethod ='post';
      RequestResource1.body = this.UserProfile;
      let RequestResource2 = new RequestResource();
      RequestResource2.requestUrl = env.cartInfoAPI+'GetUserBasketInfoFromCache';
      RequestResource2.httpMethod ='get';
      forkRequest.requestParamter = new Array<RequestResource>();
      forkRequest.requestParamter.push(RequestResource1);
      forkRequest.requestParamter.push(RequestResource2);


      this.getForkItems(forkRequest).subscribe(([userProfileResponse,UserCartInformation])=>{
        let UserProfileResponse = userProfileResponse;
        let UserCartInfoResponse = JSON.parse(UserCartInformation);
        // if(responseList.length>0){
        // }
        if(UserProfileResponse != null){
          this.UserProfile.points = UserProfileResponse.points;
          this.UserProfile.cartAmount = UserProfileResponse.cartAmount;
          this.UserProfile.roleName = UserProfileResponse.roleName;
        }

          //cart information
        if(UserCartInfoResponse.Items != null){
        let count =0;
        if(UserCartInfoResponse.Items.length >0){
            UserCartInfoResponse.Items.forEach((item:any) =>{
                  count +=item.quantity;
               });
            }
            this._broadcastService.updateCartCountWithvalue(count);
          }
      });

      

    }

    
}
