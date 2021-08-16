import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/helper/Autho.service';
import { RequestResource, ResourceServiceForkRequest } from 'src/app/Models/ResouceService/ResourceServiceForkRequest';
import { UserInfo } from 'src/app/Models/UserProfile';
import { DataSharingService } from 'src/app/Services/data-sharing.service';
import { ModalService } from 'src/app/Services/ModalService.service';
import { ResourceService } from 'src/app/Services/Resouce.service';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-user-first',
  templateUrl: './user-first.component.html',
  styleUrls: ['./user-first.component.css']
})
export class UserFirstComponent extends ResourceService<UserInfo> implements OnInit {
  getVersionUrl(): string {
    //return env.baseV1Url;
    return env.userAPI;
  }
  actionName(): string {
    return "GetOrUpdateUserDetails";
  }
  UserProfile:UserInfo;
  MenuItems: MenuItem[];
  CurrentUserRole:string;
  

  constructor(private AuthService:AuthService,httpclient:HttpClient,private BroadcastService:DataSharingService) {
    super(httpclient,'')
   }

  ngOnInit(): void {
    
    this.UserProfile = this.AuthService.getUserInformation();

    this.CurrentUserRole = "user";

    this.MenuItems =  [
      {label: 'Home', icon: 'pi pi-fw pi-home',routerLink: ['./home']},
      {label: 'Vendor', icon: 'pi pi-fw pi-calendar',routerLink:['./vendorlist']},
      {label: 'Menu', icon: 'pi pi-fw pi-calendar',visible:false},
      {label: 'Cart', icon: 'pi pi-fw pi-calendar',visible:false},
      {label: 'Profile', icon: 'pi pi-fw pi-pencil',routerLink:['./user-profile']},
      {label: 'Payment', icon: 'pi pi-fw pi-file',routerLink:['./user-payment']},
      {label: 'Settings', icon: 'pi pi-fw pi-cog'}
    ];

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

      this.getItemsByFork(forkRequest).subscribe(([userProfileResponse,UserCartInformation])=>{
        let UserProfile = userProfileResponse;
        let UserCartInfo = JSON.parse(UserCartInformation);
        // if(responseList.length>0){
        // }
        if(UserProfile!=null){
          this.UserProfile.points = UserProfile.points;
          this.UserProfile.cartAmount = UserProfile.cartAmount;
          this.UserProfile.roleId = UserProfile.roleId;
        }

          //cart information
          if(UserCartInfo.Items != null){
            let count =0;
            if(UserCartInfo.Items.length >0){
                UserCartInfo.Items.forEach((item:any) =>{
                  count +=item.quantity;
               });
            }
            this.BroadcastService.updateCartCountWithvalue(count);
          }
      })

    }

    // open() {
    //   let title="This USer First";
    //   let body="Body body";
    //   this.modalService.openModal(title,body);
    // }
}
