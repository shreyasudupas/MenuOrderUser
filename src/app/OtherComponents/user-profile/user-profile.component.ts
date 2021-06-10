import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/helper/Autho.service';
import { UserInfo } from 'src/app/Models/UserProfile';
import { DataSharingService } from 'src/app/Services/data-sharing.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
userProfile:UserInfo;
@Input() InputUserProfile:UserInfo;

  constructor(private share:DataSharingService,private auth:AuthService) { }

  ngOnInit(): void {
    
    //get the current token
    this.userProfile = this.InputUserProfile;
    
  }

}
