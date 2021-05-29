import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { VendorDetails } from 'src/app/Models/VendorDetails';
import { DataServiceService } from 'src/app/Services/data-service.service';
import { DataSharingService } from 'src/app/Services/data-sharing.service';
import {Vendor} from '../../Models/Vendor';


@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
headername:string="Ventura";
vendorList:Vendor[];
activeItem: MenuItem;

  constructor(private router: Router,private dataService:DataServiceService,private sharing:DataSharingService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    //console.log(this.router.url);

    this.dataService.getVendorList().subscribe(result=>
      {
        this.vendorList = Object.assign(result.content);
      },
      (err) => console.log(err)
      );

      //change the active Item in menu
      this.sharing.getActiveItem("Vendor");

  }

  //call menu-list-Display component
  callMenuList(menuId:number,vendorName:string):void{
    //this.router.navigate(['../menulist',menuId],{relativeTo:this.route})
    let VedorDetails = new VendorDetails();
    VedorDetails.vendorId=menuId;
    VedorDetails.vendorName = vendorName;
    this.router.navigateByUrl("/user/menulist",{state:VedorDetails});
  }


}
