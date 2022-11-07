import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCartInformation } from 'src/app/Models/cart-information/UserCartInformation';
import { VendorDetails } from 'src/app/Models/Vendor/VendorDetails';
import { DataSharingService } from 'src/app/Services/data-sharing.service';
import { environment as env} from 'src/environments/environment';
import { BaseComponent } from 'src/app/shared/component/base-component';
import { MenuService } from 'src/app/Services/menu.service';
import { VendorMenuColumnDetails } from 'src/app/Models/cart-information/VendorMenuColumnDetails';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'cart-information',
  templateUrl: './cart-information.component.html',
  styleUrls: ['./cart-information.component.css'],
  providers: [MessageService]
})

export class CartInformationComponent extends BaseComponent<any> implements OnInit {

totalPrice:number=0;
userCartInformation:UserCartInformation;
columns:any[]=[];
vendorMenuColumnDetails:VendorMenuColumnDetails[];
toastMessage:string = "top-right";

  constructor(public _broadcastService:DataSharingService
    ,private router:Router
    ,public httpclient:HttpClient
    ,public _menuService:MenuService
    ,private activatedRoute:ActivatedRoute
    ,private messageService:MessageService) {
    super(_menuService,httpclient,_broadcastService);
   }

  ngOnInit(): void {

    this.componentName = this.activatedRoute.snapshot.routeConfig?.component?.name;
    this.versionUrl = env.BasketAPI;
    this.action = null; 

    this.Initilize();

    this.GetItem(null).subscribe((result:any)=>{
        this.userCartInformation = result;

        //add columns
        if(this.userCartInformation.Items != null){

          //get column info for that vendor
          this.versionUrl = env.vendorAPI;
          this.action = "menucolumnsdetails";

          let queryparam = new HttpParams().set('vendorid',this.userCartInformation.VendorDetails?.id);

          this.GetItem(queryparam).subscribe((result:any[])=>{

            this.vendorMenuColumnDetails = result;

            //add each item in column
            this.vendorMenuColumnDetails.forEach(columnResult=>{
              this.columns.push({ field: columnResult.columnName , header: columnResult.displayName , display: columnResult.displayOnScreen })
            });

            //last add quantity which doesnt come with vendorMenuColumn API
            this.columns.push({field: 'quantity', header: 'Quantity'})

            //console.log(this.columns);

            this.calcaluteTotalPrice(this.userCartInformation.Items);
            
          });
        }
    }); 
  }


  backToMenu(vendorId:string,vendorName:string){
    let VenderDetails = new VendorDetails();
    VenderDetails.vendorId = vendorId;
    VenderDetails.vendorName = vendorName;
    //this.router.navigate(['../menulist',vendorId],{relativeTo:this.route});
    this.router.navigateByUrl("/user/menu-display",{state:VenderDetails});
  }

  proccedToPayment(){
    this.router.navigateByUrl("/user/user-payment");
  }

  calcaluteTotalPrice(menuItems:any[]){

    menuItems.forEach((item:any) =>{
      this.totalPrice+= item["price"];
    });

  }

  backToVendor(){
    this.router.navigateByUrl("/user/vendorlist");
  }

  deleteCartItems(){
    this.versionUrl = env.BasketAPI;
    this.action = null;
    
    this.delete(null).subscribe((res:any)=>{
      console.log('Delete Successful Cart Item');

      this.messageService.add({key: 'tl',severity:'success', summary: 'Success', detail: 'Items Deleted'});

      this._broadcastService.updateCartCountWithvalue(0);
      //this.backToVendor();
      this.userCartInformation = null;
    });
  }
}
