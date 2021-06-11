import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/helper/Autho.service';
import { UserInfo } from 'src/app/Models/UserProfile';
import { DataServiceService } from 'src/app/Services/data-service.service';

@Component({
  selector: 'app-user-first',
  templateUrl: './user-first.component.html',
  styleUrls: ['./user-first.component.css']
})
export class UserFirstComponent implements OnInit {
  UserProfile:UserInfo;
  MenuItems: MenuItem[];
  CurrentUserRole:string;

  constructor(private AuthService:AuthService,private DataService:DataServiceService) { }

  ngOnInit(): void {
    
    this.UserProfile = this.AuthService.getUserInformation();

    this.CurrentUserRole = "user";

    this.MenuItems =  [
      {label: 'Home', icon: 'pi pi-fw pi-home',routerLink: ['./home']},
      {label: 'Vendor', icon: 'pi pi-fw pi-calendar',routerLink:['./vendorlist']},
      {label: 'Menu', icon: 'pi pi-fw pi-calendar',visible:false},
      {label: 'Profile', icon: 'pi pi-fw pi-pencil',routerLink:['./user-profile']},
      {label: 'Payment', icon: 'pi pi-fw pi-file'},
      {label: 'Settings', icon: 'pi pi-fw pi-cog'}
    ];

    //get user Info
    this.DataService.getUserInfo(this.UserProfile).subscribe((response)=>{
      if(response!=null){
        this.UserProfile.points = response.points;
        this.UserProfile.wallet = response.cartAmount;
        this.UserProfile.roleId = response.roleId;
        console.log(this.UserProfile);
      }
    },
    (err)=>console.log(err));
  }

}
