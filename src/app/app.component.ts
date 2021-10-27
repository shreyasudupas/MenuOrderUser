import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './helper/service/Autho.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
isLogin:boolean = false;

  constructor(public _authService: AuthService,public route:Router) { }

  ngOnInit(){
    this.isLogin = this._authService.isAuthenticated();

    if(!this.isLogin){
      this.route.navigate(['login']);
    }
  }

}
