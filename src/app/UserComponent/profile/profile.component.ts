import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/shared/component/base-component';
import { DataSharingService } from 'src/app/Services/data-sharing.service';
import { MenuService } from 'src/app/Services/menu.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends BaseComponent<any> implements OnInit {

  constructor(public _broadcastService:DataSharingService,public http:HttpClient,
    private route:ActivatedRoute,public _menuService:MenuService,public activatedRoute:ActivatedRoute) {
      super(_menuService,http,_broadcastService);
     }

  ngOnInit(): void {

    this.componentName = this.activatedRoute.snapshot.routeConfig?.component?.name;
    this.versionUrl = "";
    this.action = ""; 

    this.InitilizeMenu();
  }

}
