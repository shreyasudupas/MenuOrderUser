import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/helper/Autho.service';
import { UserInfo } from 'src/app/Models/UserProfile';

@Component({
  selector: 'app-user-first',
  templateUrl: './user-first.component.html',
  styleUrls: ['./user-first.component.css']
})
export class UserFirstComponent implements OnInit {
  UserProfile:UserInfo;

  constructor(private AuthService:AuthService) { }

  ngOnInit(): void {
    
    this.UserProfile = this.AuthService.getUserInformation();
  }

}
