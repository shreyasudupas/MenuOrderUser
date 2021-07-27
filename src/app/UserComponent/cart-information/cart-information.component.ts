import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartInformationDisplay } from 'src/app/Models/CartInformationDisplay';
import { menuCart } from 'src/app/Models/menuCart';
import { VendorDetails } from 'src/app/Models/VendorDetails';
import { DataSharingService } from 'src/app/Services/data-sharing.service';
import { GetBasketService } from 'src/app/Services/GetBasketService';

@Component({
  selector: 'cart-information',
  templateUrl: './cart-information.component.html',
  styleUrls: ['./cart-information.component.css']
})
export class CartInformationComponent implements OnInit {
itemsList:menuCart[]=[];
displayInfo:CartInformationDisplay;
totalPrice:number=0;

  constructor(private share:DataSharingService,private router:Router,private httpclient:HttpClient) { }

  ngOnInit(): void {

    //get the items from cart
    //this.itemsList = 
    let basketService = new GetBasketService(this.httpclient,'GetUserBasket');
    basketService.GetAllItems().then(response=>{ 
      if(response != undefined){
        this.itemsList = response;

        this.displayInfo = new CartInformationDisplay();
        this.displayInfo.itemList=[];
        
        if(this.itemsList)
        this.itemsList.forEach(items=>{
          this.displayInfo.vendorId = items.vendorId;
          this.displayInfo.vendorName = items.vendorName;
          this.displayInfo.itemList.push({
            menuItem : items.menuItem,offerPrice : items.offerPrice,price:items.price,quantity : items.quantity
          });
          this.totalPrice += items.price; 
        });
      }
       //update the cart count used only when refreshed
       this.share.updateCartCountWithvalue(this.itemsList.length);
    });

    //change the active Item in menu
    this.share.getActiveItem("Cart");
  }

  getOrderCartItems(){
    // let items  = sessionStorage.getItem('cartDetails')|| '[]';
    // let currentItemInCart:menuCart[] = JSON.parse(items);
    // return currentItemInCart;
    
  }

  BackToMenu(vendorId:bigint,vendorName:string){
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
