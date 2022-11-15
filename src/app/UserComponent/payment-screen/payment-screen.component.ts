import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BaseComponent } from 'src/app/shared/component/base-component';
import { PaymentScreenResponse } from 'src/app/Models/payment-screen/PaymentScreenResponse';
import { UserAddress } from 'src/app/Models/user/UserProfile';
//import { UserInfo } from 'src/app/Models/user/UserProfile';
import { DataSharingService } from 'src/app/Services/data-sharing.service';
import { MenuService } from 'src/app/Services/menu.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-payment-screen',
  templateUrl: './payment-screen.component.html',
  styleUrls: ['./payment-screen.component.css'],
  providers:[MessageService]
})
export class PaymentScreenComponent extends BaseComponent<PaymentScreenResponse> implements OnInit  {
 
  TotalPrice:number = 0;
  orderButtonDisable:boolean;
  paymentScreenResponse:PaymentScreenResponse;
  paymentSelect:any;
  apiDropDown:string;
  paymentForm:FormGroup;

  addresses: any[] = [];

  constructor(public _broadcastService:DataSharingService,public http:HttpClient,
    private route:ActivatedRoute,public _menuService:MenuService,public activatedRoute:ActivatedRoute,private messageService: MessageService
    ,private formBuilder: FormBuilder) { 
    super(_menuService,http,_broadcastService);

    this.apiDropDown =  env.userAPI+'GetPaymentDropDown';
    this.paymentScreenResponse = new PaymentScreenResponse();

    this.paymentForm = this.formBuilder.group({
      PaymentMode:[null,Validators.required],
      UserAddress:[]
    });

  }

  ngOnInit(): void {
    
    
    this.componentName = this.activatedRoute.snapshot.routeConfig?.component?.name;
    this.Initilize();
    //this.paymentSelect = "Credit Card";
    this.getBasketInfo();
    
  }

  getBasketInfo(){
    let param = new HttpParams();
    this.versionUrl = env.orderAPI;
    this.action = 'GetUserPaymentDetails';
    this.GetItem(param).toPromise().then((result)=>{
        this.paymentScreenResponse = result;

        if(this.paymentScreenResponse.userInfo != null && this.paymentScreenResponse.totalAmount >0){
          if(this.paymentScreenResponse.userInfo.address.length > 0 ){
            this.paymentScreenResponse.userInfo.address.forEach(element=>{
              let addr = element.fullAddress + ' ' + element.city + ' ' + element.state
              //this.addresses.push({ name:addr , key:element.userAddressId});

              //if item is active set the form as default addresses
              if(element.isActive){
                //this.paymentForm.patchValue({UserAddress: element.userAddressId});
              }

            });
          }
        }
        
    });
  }

  OnPaymentSubmit(){
    console.log(this.paymentForm.value);
  }

  
  ngOnDestroy(){
    //this.subscription.unsubscribe();
  }

}
