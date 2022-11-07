import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserInfo } from 'src/app/Models/user/UserProfile';
import { DataSharingService } from 'src/app/Services/data-sharing.service';
import { environment as env} from 'src/environments/environment';

@Component({
  selector: 'user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  UserProfile:UserInfo;

  constructor(private http:HttpClient
    ,private dataSharingService:DataSharingService) {
   }

  ngOnInit(): void {

    //call the cart initize
    this.dataSharingService.getCurrentUserInfo().subscribe((userInfo:UserInfo)=>{

      if(userInfo != undefined && userInfo.userId != null){
        let url = env.BasketAPI + '/' + 'personalInfo';
        let body = {
          'userId' : userInfo.userId,
          'username':userInfo.username
        };
        this.http.post(url,body)
          .pipe(
            map((response:any)=>{
            return response;
          })).subscribe((result:any)=>{
              console.log('Initialize User Cart: ' + result);
          });
      }      
    });
  }
    
}
