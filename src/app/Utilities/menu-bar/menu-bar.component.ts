import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
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
  // @Input() GetMenuItems:MenuItem[];
  // @Input() RoleName?: string;

  constructor(private BroadcastService:DataSharingService) { }

  ngOnInit(): void {

    this.subscription = this.BroadcastService.getActiveMenuList().subscribe((result)=>{
      this.items = result.itemList;
      this.activeItem = result.activeMenu;
    });

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
