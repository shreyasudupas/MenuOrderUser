import { Component, NgZone, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataSharingService } from '../../Services/data-sharing.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  items: MenuItem[];
  activeItem: MenuItem;
  subscription: Subscription;

  constructor(private router: Router,private ngZone:NgZone,private DataSharing:DataSharingService) { }

  ngOnInit(): void {

    this.items = [
      {label: 'Home', icon: 'pi pi-fw pi-home',routerLink: ['/home']},
      {label: 'Vendor', icon: 'pi pi-fw pi-calendar',routerLink:['/vendorlist']},
      {label: 'Menu', icon: 'pi pi-fw pi-calendar',visible:false},
      {label: 'Profile', icon: 'pi pi-fw pi-pencil'},
      {label: 'Payment', icon: 'pi pi-fw pi-file'},
      {label: 'Settings', icon: 'pi pi-fw pi-cog'}
    ];

    //get active Item in the Navigation Tab
      this.subscription = this.DataSharing.getCurrentItem().subscribe((activeMenuItem)=>{
        //console.log("Active element"+ activeMenuItem);

        var i = this.items.findIndex(x=>x.label == activeMenuItem);
        this.activeItem = this.items[i];

        //for Menu visibility
        if(this.items[i].label == 'Menu'){
          //setting with value because we want only the menu to be invisible/visible based on condition
          this.items[2].visible = true;
        }else{
          this.items[2].visible = false;
        }
      });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('menu destroyed');
  }

}
