import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { GlobalConstant } from 'src/app/global/global-constants';
import { UserCartInformation } from 'src/app/Models/cart-information/UserCartInformation';
import { CartConfiguration } from 'src/app/Models/cart-configuration/cart-configuration';
import { VendorDetails } from 'src/app/Models/Vendor/VendorDetails';
import { DataSharingService } from 'src/app/Services/data-sharing.service';
import { environment as env} from 'src/environments/environment';

@Component({
  selector: 'cart-information',
  templateUrl: './cart-information.component.html',
  styleUrls: ['./cart-information.component.css']
})

export class CartInformationComponent implements OnInit {

totalPrice:number=0;
menuCacheItems:UserCartInformation;
cartConfig:CartConfiguration;
columns:any[]=[];

  constructor(private share:DataSharingService,private router:Router,public httpclient:HttpClient) {
   }

  ngOnInit(): void {

    let url = env.cartInfoAPI+"GetUserBasketInfoFromCache";
    this.httpclient.get(url).pipe(map((response:any)=>{
        if(response.statusCode ==200){
          return response.content;
        }else{
          return new Error("Error in User Basket From Cache");
        }
      }),
      mergeMap((response:any)=>{
        this.menuCacheItems = JSON.parse(response);

        if(this.menuCacheItems.VendorDetails != null || this.menuCacheItems.VendorDetails != undefined){
          //calcalute total
          this.calcaluteTotalPrice(this.menuCacheItems.Items);

          let url = env.vendorConfigAPI+'GetVendorCartConfigruation?vendorId='+this.menuCacheItems.VendorDetails.id;
          return this.httpclient.get(url).pipe(map((response:any)=>{
            if(response.statusCode ==200){
              return response.content;
            }else{
              return new Error("Error in GetVendorCartConfigruation");
            }
          }));
        }
        else{
          return of(GlobalConstant.VENDOR_DETAILS_NOTFOUND);
        }
      }
      )).subscribe((data:any)=>{
        //console.log(data);
        if( data != GlobalConstant.VENDOR_DETAILS_NOTFOUND){
          this.cartConfig = data;

          if(this.cartConfig != null){
            this.cartConfig.columnDetails.forEach((element:any)=>{
              this.columns.push({ field: element.columnName,header: element.displayName,display:element.displayScreen});
            });

            //last add quantity
            this.columns.push({ field: 'quantity',header: 'Quantity',display:''});
          }
        }else{
          // this.menuCacheItems.Items = [];
        }        
    },(err)=>{
      console.log(err);
    })

    //change the active Item in menu
    this.share.getActiveItem("Cart");
  }


  BackToMenu(vendorId:string,vendorName:string){
    let VenderDetails = new VendorDetails();
    VenderDetails.vendorId = vendorId;
    VenderDetails.vendorName = vendorName;
    //this.router.navigate(['../menulist',vendorId],{relativeTo:this.route});
    this.router.navigateByUrl("/user/menu-display",{state:VenderDetails});
  }

  ProccedToPayment(){
    this.router.navigateByUrl("/user/user-payment");
  }

  calcaluteTotalPrice(cacheItem:any[]){
    cacheItem.forEach((item:any) =>{
      this.totalPrice+= item["Price"];
    });
  }

  BackToVendor(){
    this.router.navigateByUrl("/user/vendorlist");
  }
}
