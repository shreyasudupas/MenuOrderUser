import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BaseComponent } from 'src/app/helper/base-component';
import { UserCartInformation } from 'src/app/Models/cart-information/UserCartInformation';
import { PaymentScreenResponse } from 'src/app/Models/payment-screen/PaymentScreenResponse';
import { CartUserProfile } from 'src/app/Models/user/CartUserProfile';
//import { UserInfo } from 'src/app/Models/user/UserProfile';
import { DataSharingService } from 'src/app/Services/data-sharing.service';
import { GetBasketService } from 'src/app/Services/GetBasketService';
import { MenuService } from 'src/app/Services/menu.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-payment-screen',
  templateUrl: './payment-screen.component.html',
  styleUrls: ['./payment-screen.component.css'],
  providers:[MessageService]
})
export class PaymentScreenComponent extends BaseComponent<string> implements OnInit  {
 
  TotalPrice:number = 0;
  UserProfile:CartUserProfile;
  orderButtonDisable:boolean;
  paymentScreenResponse:PaymentScreenResponse;
  cities:any[]=[];
  selectedCity:any;
  paymentSelect:any;
  apiDropDown:string;
  CacheItem:UserCartInformation;
  paymentForm:FormGroup;

  constructor(public _broadcastService:DataSharingService,public http:HttpClient,
    private route:ActivatedRoute,public _menuService:MenuService,public activatedRoute:ActivatedRoute,private messageService: MessageService
    ,private formBuilder: FormBuilder) { 
    super(_menuService,http,_broadcastService);

    this.apiDropDown =  env.userAPI+'GetPaymentDropDown';
  }

  ngOnInit(): void {
    

    this.componentName = this.activatedRoute.snapshot.routeConfig?.component?.name;
    this.versionUrl = "";
    this.action = ""; 

    this.Initilize();

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

  this.paymentForm = this.formBuilder.group({
    CustomerName:['',Validators.required],
    City:[null,Validators.required]
  })
    
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
      this._broadcastService.updateCartCountWithvalue(0);
      this.TotalPrice = 0;
      this.orderButtonDisable=true;
    });
  }

  ngOnDestroy(){
    //this.subscription.unsubscribe();
  }

}
