import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { VendorDetails } from 'src/app/Models/VendorDetails';
import { DataSharingService } from 'src/app/Services/data-sharing.service';
import { ResourceService } from 'src/app/Services/Resouce.service';
import {Vendor} from '../../Models/Vendor';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent extends ResourceService<Vendor> implements OnInit {
  getVersionUrl(): string {
    //return env.baseV1Url;
    return env.vendorAPI;
  }
  actionName(): string {
    return "GetVendorList";
  }
headername:string="Ventura";
vendorList:Vendor[];
activeItem: MenuItem;

  constructor(private router: Router,private sharing:DataSharingService,http:HttpClient) {
    super(http,'');
   }

  ngOnInit(): void {
    
    this.listItems().subscribe((result)=>{
      this.vendorList = result
    }
    );
      //change the active Item in menu
      this.sharing.getActiveItem("Vendor");

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
