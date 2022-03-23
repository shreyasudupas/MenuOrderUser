import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/helper/service/Autho.service';

@Component({
    selector: 'app-signin-redirect-callback',
    templateUrl: './signin-redirect-callback.component.html'
})

export class SigninRedirectCallbackComponent implements OnInit {

    constructor(private _authService: AuthService, private _router: Router) { }
    
    ngOnInit(): void {
        console.log('SigninRedirectCallbackComponent loaded');

        this._authService.finishLogin().then(() => {
            this._router.navigate(['/user'],{ replaceUrl:true });
        })
    }
}