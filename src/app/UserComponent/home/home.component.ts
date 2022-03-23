import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/shared/component/base-component';
import { DataSharingService } from 'src/app/Services/data-sharing.service';
import { MenuService } from 'src/app/Services/menu.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent<any> implements OnInit {
  
  subscription: Subscription;

  constructor(public _menuService:MenuService,public httpclient:HttpClient,public _broadcastService:DataSharingService,public activatedRoute:ActivatedRoute) {
    super(_menuService,httpclient,_broadcastService);
  }

  ngOnInit(): void {

    this.componentName = this.activatedRoute.snapshot.routeConfig?.component?.name;
    this.versionUrl = "";
    this.action = ""; 

    this.Initilize();
  }

  ngOnDestroy(){
    console.log("Home destroyed");
  }

}
