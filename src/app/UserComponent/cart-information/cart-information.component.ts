import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { UserCartInformation } from 'src/app/Models/cart-information/UserCartInformation';
import { CartConfiguration } from 'src/app/Models/CartConfiguration/cart-configuration';
import { CartInformationDisplay } from 'src/app/Models/CartInformationDisplay';
import { menuCart } from 'src/app/Models/menuCart';
import { VendorDetails } from 'src/app/Models/VendorDetails';
import { DataSharingService } from 'src/app/Services/data-sharing.service';
import { ResourceService } from 'src/app/Services/Resouce.service';
import { environment as env} from 'src/environments/environment';

@Component({
  selector: 'cart-information',
  templateUrl: './cart-information.component.html',
  styleUrls: ['./cart-information.component.css']
})
export class CartInformationComponent  extends ResourceService<any> implements OnInit {
  getVersionUrl(): string {
    return env.cartInfoAPI;
  }
  actionName(): string {
    return "GetUserBasketInfoFromCache";
  }
itemsList:menuCart[]=[];
displayInfo:CartInformationDisplay;
totalPrice:number=0;
menuCacheItems:UserCartInformation;
cartConfig:CartConfiguration;
columns:any[]=[];

  constructor(private share:DataSharingService,private router:Router,public httpclient:HttpClient) {
    super(httpclient,"")
   }

  ngOnInit(): void {

    //get the items from cart
    //this.itemsList = 
    // let basketService = new GetBasketService(this.httpclient,'GetUserBasket');
    // basketService.GetAllItems().then(response=>{ 
    //   if(response != undefined){
    //     this.itemsList = response;

    //     this.displayInfo = new CartInformationDisplay();
    //     this.displayInfo.itemList=[];
        
    //     if(this.itemsList)
    //     this.itemsList.forEach(items=>{
    //       this.displayInfo.vendorId = items.vendorId;
    //       this.displayInfo.vendorName = items.vendorName;
    //       this.displayInfo.itemList.push({
    //         menuItem : items.menuItem,offerPrice : items.offerPrice,price:items.price,quantity : items.quantity
    //       });
    //       this.totalPrice += items.price; 
    //     });
    //   }
    //    //update the cart count used only when refreshed
    //    this.share.updateCartCountWithvalue(this.itemsList.length);
    // });
    

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
          return throwError(new Error("Vendor details not present in cache"));
        }
      }
      )).subscribe((data:any)=>{
        console.log(data);

        this.cartConfig = data;
    })

    //change the active Item in menu
    this.share.getActiveItem("Cart");
  }

  getOrderCartItems(){
    // let items  = sessionStorage.getItem('cartDetails')|| '[]';
    // let currentItemInCart:menuCart[] = JSON.parse(items);
    // return currentItemInCart;
    
  }

  BackToMenu(vendorId:string,vendorName:string){
    let VenderDetails = new VendorDetails();
    VenderDetails.vendorId = vendorId;
    VenderDetails.vendorName = vendorName;
    //this.router.navigate(['../menulist',vendorId],{relativeTo:this.route});
    this.router.navigateByUrl("/user/menulist",{state:VenderDetails});
  }

  ProccedToPayment(){
    this.router.navigateByUrl("/user/user-payment");
  }

}
