import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserInfo } from 'src/app/Models/user/UserProfile';

@Component({
  selector: 'user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
 
  UserProfile:UserInfo;
  MenuItems: MenuItem[];
  CurrentUserRole:string;
  

  constructor() {
   }

  ngOnInit(): void {
    this.CurrentUserRole = "user";
    }

    
}
