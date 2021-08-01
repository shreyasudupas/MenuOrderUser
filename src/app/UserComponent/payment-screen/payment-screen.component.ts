import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, NgZone, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { menuCart } from 'src/app/Models/menuCart';
import { PaymentScreenResponse } from 'src/app/Models/payment-screen/PaymentScreenResponse';
import { UserInfo } from 'src/app/Models/UserProfile';
import { DataSharingService } from 'src/app/Services/data-sharing.service';
import { GetBasketService } from 'src/app/Services/GetBasketService';
import { ResourceService } from 'src/app/Services/Resouce.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-payment-screen',
  templateUrl: './payment-screen.component.html',
  styleUrls: ['./payment-screen.component.css'],
  providers:[MessageService]
})
export class PaymentScreenComponent extends ResourceService<string> implements OnInit  {
  getVersionUrl(): string {
    return env.orderAPI;
  }
  actionName(): string {
    return "UserOrder";
  }
  cartItems:menuCart[]=[];
  TotalPrice:number = 0;
  UserProfile:UserInfo;
  subscription:Subscription;
  orderButtonDisable:boolean;
  paymentScreenResponse:PaymentScreenResponse;
  cities:any[]=[];
  selectedCity1:any;

  constructor(private BroadcastService:DataSharingService,private http:HttpClient,private messageService: MessageService) { 
    super(http,'')
  }

  ngOnInit(): void {
    //set active menu item
    this.BroadcastService.getActiveItem('Payment');
    //get cart items from session strorage
    this.getOrderCartItems();

    //get UserInfo
    this.subscription = this.BroadcastService.getCurrentUserInfo().subscribe((result)=>{
      this.UserProfile = result;
      if(this.UserProfile.nickname == undefined ){
        let userStrorage = sessionStorage.getItem('userInfo')|| '{}';
        let user = JSON.parse(userStrorage);
        this.UserProfile = user;
      }
    });
    
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];

    
  }

  getOrderCartItems(){
    // let items  = sessionStorage.getItem('cartDetails')|| '[]';
    // let currentItemInCart:menuCart[] = JSON.parse(items);
    // return currentItemInCart;
    let basket = new GetBasketService(this.http,'GetUserBasket');
    //let cartItems:menuCart[] = [];
    basket.GetAllItems().then((result:any)=>{
      this.cartItems = result;

      if(this.cartItems != null){
        if(this.cartItems.length > 0)
          this.TotalPrice = this.getTotalPrice(this.cartItems);
          this.orderButtonDisable = false;
      }else{
        this.orderButtonDisable = true;
      }
        
    });
  }

  getTotalPrice(items:menuCart[]){
    let TotalAmount:number = 0;
    items.forEach(item =>{
      TotalAmount+= item.price;
    });
    return TotalAmount;
  }

  OrderUserBasket(){
    this.paymentScreenResponse = new PaymentScreenResponse();
    //call the order gateway to place the order of the user basket
    this.createItem(null).subscribe(result =>{
      this.paymentScreenResponse.ReponseMessage = result;
      this.messageService.add({severity: 'success',summary:'Success', detail:this.paymentScreenResponse.ReponseMessage});
      this.BroadcastService.updateCartCountWithvalue(0);
      this.TotalPrice = 0;
      this.orderButtonDisable=true;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
