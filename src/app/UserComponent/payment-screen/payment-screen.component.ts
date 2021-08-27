import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserCartInformation } from 'src/app/Models/cart-information/UserCartInformation';
import { PaymentScreenResponse } from 'src/app/Models/payment-screen/PaymentScreenResponse';
import { UserInfo } from 'src/app/Models/user/UserProfile';
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
  //cartItems:menuCart[]=[];
  TotalPrice:number = 0;
  UserProfile:UserInfo;
  orderButtonDisable:boolean;
  paymentScreenResponse:PaymentScreenResponse;
  cities:any[]=[];
  selectedCity:any;
  paymentSelect:any;
  apiDropDown:string;
  CacheItem:UserCartInformation;

  constructor(private BroadcastService:DataSharingService,private http:HttpClient,private messageService: MessageService) { 
    super(http,'')
    this.apiDropDown =  env.userAPI+'GetPaymentDropDown';
  }

  ngOnInit(): void {
    //set active menu item
    this.BroadcastService.getActiveItem('Payment');
    //get cart items cache server
    this.getOrderCartItems();

    
    this.cities = [
      {label: 'New York', value: 'New York'},
      {label: 'Rome', value: 'Rome'},
      {label: 'London', value: 'London'},
      {label: 'Istanbul', value: 'Istanbul'},
      {label: 'Paris', value: 'Paris'}
  ];
  this.paymentSelect = "Credit Card";
    
  }

  getOrderCartItems(){
    
    let basket = new GetBasketService(this.http,'GetUserBasketInfoFromCache');
    basket.GetAllItems().then((result:string)=>{
      if(result != null){
        this.CacheItem = JSON.parse(result);
        this.UserProfile = this.CacheItem.UserInfo;

        this.getTotalPrice(this.CacheItem.Items);
      }
      //console.log(result);
        
    });
  }

  getTotalPrice(items:any[]){

    items.forEach(item =>{
      this.TotalPrice += item["Price"];
    });
    return this.TotalPrice;
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
    //this.subscription.unsubscribe();
  }

}
