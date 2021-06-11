import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/helper/Autho.service';
import { UserInfo } from 'src/app/Models/UserProfile';

@Component({
  selector: 'app-user-first',
  templateUrl: './user-first.component.html',
  styleUrls: ['./user-first.component.css']
})
export class UserFirstComponent implements OnInit {
  UserProfile:UserInfo;
  MenuItems: MenuItem[];
  CurrentUserRole:string;

  constructor(private AuthService:AuthService) { }

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
  }

}
