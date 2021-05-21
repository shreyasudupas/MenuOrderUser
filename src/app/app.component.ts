import { Component,OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: MenuItem[];
  title = 'MenuOrderUser';
  activeItem: MenuItem;

  constructor(private router: Router){
  }

  ngOnInit(){
    /*this.items = [
      {label: 'Home', icon: 'pi pi-fw pi-home',routerLink: ['/home']},
      {label: 'Vendor', icon: 'pi pi-fw pi-calendar',routerLink:['/vendorlist']},
      {label: 'Profile', icon: 'pi pi-fw pi-pencil'},
      {label: 'Payment', icon: 'pi pi-fw pi-file'},
      {label: 'Settings', icon: 'pi pi-fw pi-cog'}
    ];

    console.log(this.router.url);

    if(this.router.url ==='/vendorlist')
        this.activeItem = this.items[1];
      else
      this.activeItem == this.items[0];*/
  }

}
