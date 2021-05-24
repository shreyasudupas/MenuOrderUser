import { Component, OnInit } from '@angular/core';
import { CartInformationDisplay } from 'src/app/Models/CartInformationDisplay';
import { menuCart } from 'src/app/Models/menuCart';
import { DataSharingService } from 'src/app/Services/data-sharing.service';

@Component({
  selector: 'cart-information',
  templateUrl: './cart-information.component.html',
  styleUrls: ['./cart-information.component.css']
})
export class CartInformationComponent implements OnInit {
itemsList:menuCart[]=[];
displayInfo:CartInformationDisplay;

  constructor(private share:DataSharingService) { }

  ngOnInit(): void {

    //get the items from cart
    this.itemsList = this.getOrderCartItems();
    if(this.itemsList.length>0){
      this.displayInfo = new CartInformationDisplay();
      this.displayInfo.itemList=[];

      this.itemsList.forEach(items=>{
        this.displayInfo.vendorName = items.vendorId.toString();
        this.displayInfo.itemList.push({
          menuItem : items.menuItem,offerPrice : items.offerPrice,price:items.price,quantity : items.quantity
        });
      });

      //update the cart count used only when refreshed
      this.share.updateCartCountWithvalue(this.itemsList.length);
    }
  }

  getOrderCartItems():menuCart[]{
    let items  = sessionStorage.getItem('cartDetails')|| '[{}]';
    let currentItemInCart:menuCart[] = JSON.parse(items);
    return currentItemInCart;
  }

}
