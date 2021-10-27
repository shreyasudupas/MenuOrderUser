import { Component } from '@angular/core';
import { Login } from 'src/app/Models/login/login';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent{
    title = "Login component"
    userLogin:Login;

    constructor(){
        this.userLogin = new Login();
    }

    Login(){
    }
}