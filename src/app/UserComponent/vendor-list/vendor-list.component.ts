import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorDetails } from 'src/app/Models/Vendor/VendorDetails';
import { DataSharingService } from 'src/app/Services/data-sharing.service';
import { Vendor } from '../../Models/Vendor/Vendor';
import { environment as env } from '../../../environments/environment';
import { BaseComponent } from 'src/app/shared/component/base-component';
import { MenuService } from 'src/app/Services/menu.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent extends BaseComponent<Vendor> implements OnInit {
  
vendorList:Vendor[];
userLocation:string;

  constructor(private router: Router
    ,public _broadcastService:DataSharingService
    ,http:HttpClient
    ,public _menuService:MenuService
    ,public activatedRoute:ActivatedRoute) {

    super(_menuService,http,_broadcastService);
   }

  ngOnInit(): void {
    
      this.componentName = this.activatedRoute.snapshot.routeConfig?.component?.name;
      this.versionUrl = env.vendorAPI;
      this.action = null; 

      this.InitilizeMenu();

      this._broadcastService.getUserLocality().subscribe(result=>{
        this.userLocation = result;

        //once the location is got call the vendor Api
        let queryParam = new HttpParams().set("location", this.userLocation);
        
        this.ListItems(queryParam).subscribe((result:Vendor[])=>{
            this.vendorList = result;
        });

      });

  }

  //call menu-list-Display component
  callMenuList(vendorId:string,vendorName:string):void{
    //this.router.navigate(['../menulist',menuId],{relativeTo:this.route})
    let VedorDetails = new VendorDetails();
    VedorDetails.vendorId = vendorId;
    VedorDetails.vendorName = vendorName;
    this.router.navigateByUrl("/user/menu-display",{state:VedorDetails});
  }


}
