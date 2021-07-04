import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/helper/Autho.service';
import { UserInfo } from 'src/app/Models/UserProfile';
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
  

  constructor(private AuthService:AuthService,httpclient:HttpClient) {
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

    //get user Info
  
      this.createItem(this.UserProfile).subscribe((result)=>{
        if(result!=null){
            this.UserProfile.points = result.points;
            this.UserProfile.cartAmount = result.cartAmount;
            this.UserProfile.roleId = result.roleId;
        }
      });

    }

    // open() {
    //   let title="This USer First";
    //   let body="Body body";
    //   this.modalService.openModal(title,body);
    // }
}
