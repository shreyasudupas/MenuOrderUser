import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { VendorDetails } from 'src/app/Models/Vendor/VendorDetails';
import { DataSharingService } from 'src/app/Services/data-sharing.service';
import {Vendor} from '../../Models/Vendor/Vendor';
import { environment as env } from '../../../environments/environment';
import { BaseComponent } from 'src/app/helper/base-component';
import { MenuService } from 'src/app/Services/menu.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent extends BaseComponent<Vendor> implements OnInit {
  
vendorList:Vendor[];

  constructor(private router: Router,public _broadcastService:DataSharingService,http:HttpClient,
    private route:ActivatedRoute,public _menuService:MenuService,public activatedRoute:ActivatedRoute) {

    super(_menuService,http,_broadcastService);
   }

  ngOnInit(): void {
    
      this.componentName = this.activatedRoute.snapshot.routeConfig?.component?.name;
      this.versionUrl = env.vendorAPI;
      this.action = "GetVendorList"; 

      this.Initilize();

      this.ListItems().subscribe((result) => {
        this.vendorList = result;
      })

  }

  //call menu-list-Display component
  callMenuList(menuId:string,vendorName:string):void{
    //this.router.navigate(['../menulist',menuId],{relativeTo:this.route})
    let VedorDetails = new VendorDetails();
    VedorDetails.vendorId=menuId;
    VedorDetails.vendorName = vendorName;
    this.router.navigateByUrl("/user/menu-display",{state:VedorDetails});
  }


}
