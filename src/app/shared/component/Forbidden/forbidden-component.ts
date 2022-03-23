import { Component } from '@angular/core';

@Component({
    selector: 'app-forbidden',
    template:'<div>{{title}}</div>'
})

export class ForbiddenComponent{
    title="You have no access for this page.";
}