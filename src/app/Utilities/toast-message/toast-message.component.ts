import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'toast-message',
    templateUrl:'toast-message.component.html'
})

export class ToastMessageComponent implements OnInit{
@Input() position:string;

    constructor(){

    }
    
    ngOnInit(): void {
        
    }
}