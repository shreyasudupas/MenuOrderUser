import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { menuCart } from 'src/app/Models/menuCart';
import { UserInfo } from 'src/app/Models/UserProfile';
import { DataSharingService } from 'src/app/Services/data-sharing.service';

@Component({
  selector: 'app-payment-screen',
  templateUrl: './payment-screen.component.html',
  styleUrls: ['./payment-screen.component.css']
})
export class PaymentScreenComponent implements OnInit {
  cartItems:menuCart[]=[];
  TotalPrice:number = 0;
  UserProfile:UserInfo;
  subscription:Subscription;

  constructor(private BroadcastService:DataSharingService) { }

  ngOnInit(): void {
    //set active menu item
    this.BroadcastService.getActiveItem('Payment');
    //get cart items from session strorage
    this.cartItems = this.getOrderCartItems();

    //get UserInfo
    this.subscription = this.BroadcastService.getCurrentUserInfo().subscribe((result)=>{
      this.UserProfile = result;
      if(this.UserProfile.nickname == undefined ){
        let userStrorage = sessionStorage.getItem('userInfo')|| '{}';
        let user = JSON.parse(userStrorage);
        this.UserProfile = user;
      }
    })

    if(this.cartItems.length > 0)
      this.TotalPrice = this.getTotalPrice(this.cartItems);
  }

  getOrderCartItems():menuCart[]{
    let items  = sessionStorage.getItem('cartDetails')|| '[]';
    let currentItemInCart:menuCart[] = JSON.parse(items);
    return currentItemInCart;
  }

  getTotalPrice(items:menuCart[]){
    let TotalAmount:number = 0;
    items.forEach(item =>{
      TotalAmount+= item.price;
    });
    return TotalAmount;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
