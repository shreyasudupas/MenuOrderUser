import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/helper/service/Autho.service';
import { Login } from 'src/app/Models/login/login';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    title = "Login component"
    userLogin:Login;
    public userAuthenticated = false;

    constructor(public _authService:AuthService,private router: Router){
        this.userLogin = new Login();

        this._authService.loginChanged.subscribe(userAuthenticated => {
            this.userAuthenticated = userAuthenticated;
        });
    }

    ngOnInit(): void {
        console.log('login page loaded');

        this._authService.isAuthenticated().then(userAuthenticated => {
            this.userAuthenticated = userAuthenticated;
        })
    }

    public login = () => {
        this._authService.login();
      }
}