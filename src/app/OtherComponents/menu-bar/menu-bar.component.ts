import { Component, Input, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Subscription } from 'rxjs';
import { DataSharingService } from '../../Services/data-sharing.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  items: MenuItem[]=[];
  activeItem: MenuItem;
  subscription: Subscription;
  @Input() GetMenuItems:MenuItem[];
  @Input() RoleName?: string;

  constructor(private BroadcastService:DataSharingService) { }

  ngOnInit(): void {

    this.subscription = this.BroadcastService.getActiveMenuList().subscribe((result)=>{
      this.items = result.itemList;
      this.activeItem = result.activeMenu;
    });

  }

  // customMenuVisibilityUser(menuItems:MenuItem[],index:number){
  //    //for Menu visibility for user module
  //    if(menuItems[index].label == 'Menu'){
  //     //setting with value because we want only the menu to be invisible/visible based on condition
  //     menuItems[2].visible = true;
  //   }else{
  //     menuItems[2].visible = false;
  //   }
  //   //cart vssibility
  //   if(menuItems[index].label == 'Cart'){
  //     //setting with value because we want only the menu to be invisible/visible based on condition
  //     menuItems[3].visible = true;
  //   }else{
  //     menuItems[3].visible = false;
  //   }
  // }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
