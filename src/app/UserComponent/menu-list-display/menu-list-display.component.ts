import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { menuCart } from 'src/app/Models/menuCart';
import { MenuItemList } from 'src/app/Models/MenuItemList';
import { MenuItems } from 'src/app/Models/MenuItems';
import { MenuList } from 'src/app/Models/MenuList';
import { DataSharingService } from 'src/app/Services/data-sharing.service';
import {MessageService} from 'primeng/api';
import { ResourceService } from 'src/app/Services/Resouce.service';
import { environment as env } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UpdateBasketService } from 'src/app/Services/UpdateBasketService';
import { GetBasketService } from 'src/app/Services/GetBasketService';
import { RequestResource, ResourceServiceForkRequest } from 'src/app/Models/ResouceService/ResourceServiceForkRequest';

@Component({
  selector: 'app-menu-list-display',
  templateUrl: './menu-list-display.component.html',
  styleUrls: ['./menu-list-display.component.css'],
  providers: [MessageService]
})
export class MenuListDisplayComponent extends ResourceService<MenuList> implements OnInit {

  getVersionUrl(): string {
    //return env.baseV1Url;
    return env.menuAPI;
  }
  actionName(): string {
    return "GetMenuList";
  }

  subscription:Subscription;
  itemList:MenuList;
  menuItems:MenuItems[];
  menuTypeList:MenuItemList[];
  rowGroupMetadata: any;
  menuDisplay:Array<menuCart>;
  itemsInCart:menuCart[]=[];
  nav:any|null;

  constructor(private router:Router,private route:ActivatedRoute,protected httpclient:HttpClient,private share:DataSharingService,
    private messageService:MessageService,private ngZone: NgZone) {
      super(httpclient,'');
     }

  ngOnInit(): void {

        var vendorId:number = history.state.vendorId;
        var vendorName = history.state.vendorName;

        if(vendorId == undefined || vendorId == null){
          //route back to vendor
          this.router.navigateByUrl('/user/vendorlist');

        }else{

        //set the params
        let menuParams = new HttpParams();
        menuParams = menuParams.append('VendorId',vendorId.toString());
        
        //Fork join two calls
        let forkRequest = new ResourceServiceForkRequest();
        let RequestResource1 = new RequestResource();
        RequestResource1.requestUrl = env.menuAPI+'GetMenuList?VendorId='+vendorId;
        RequestResource1.httpMethod ='get';
        let RequestResource2 = new RequestResource();
        RequestResource2.requestUrl = env.basketAPI+'GetUserBasket';
        RequestResource2.httpMethod ='get';
        forkRequest.requestParamter = new Array<RequestResource>();
        forkRequest.requestParamter.push(RequestResource1);
        forkRequest.requestParamter.push(RequestResource2);

        
        this.getItemsByFork(forkRequest).subscribe(results=>{
          if(results.length>0){
            //get menu list items
            this.itemList = results[0];
            this.menuItems = this.itemList.menuItemList;
            this.menuTypeList = this.itemList.menuItemDetails;

            let menuObj:Array<menuCart> = [];
            //assign the menuItems to menuList
            this.menuItems.forEach((item)=>{
              menuObj.push({
                id:item.id,menuItem:item.menuItem,price:item.price,vendorId:item.vendorId,menuType:item.menuType,imagePath:item.imagePath,
                offerPrice:item.offerPrice,createdDate:item.createdDate,quantity:0,vendorName:vendorName
              });
            });

            //check if the item is already in cache if yes then update
            this.menuDisplay = this.updateTheMenuListFromCache(menuObj,results[1].items);
            
            this.updateRowGroupMetaData();
          }
        });

          //setting the active item in menu bar
          this.share.getActiveItem("Menu");
          
        }
    
  }

  onSort() {
    this.updateRowGroupMetaData();
}


  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};

    if(this.menuItems){
      for(var i=0;i<this.menuItems.length;i++){
        let rowData = this.menuItems[i];
        let menuTypeName = rowData.menuType;

        //get image path for MenuType
        let menuTypeDetail = this.menuTypeList.find(x=>x.menuTypeName == menuTypeName);
        let menuPicPath = menuTypeDetail?.imagePath;

        if(i == 0){
          this.rowGroupMetadata[menuTypeName] = {index:0,size:1,imgPath:menuPicPath };
        }else{
          let previousRowData = this.menuItems[i-1];
          let previousRowGroup = previousRowData.menuType;

          if(menuTypeName == previousRowGroup)
            this.rowGroupMetadata[menuTypeName].size++;
          else
            this.rowGroupMetadata[menuTypeName] = {index:i,size:1,imgPath:menuPicPath};
        }
      }
      //console.log(this.rowGroupMetadata);
    }
  }

  addItemsoCart(itemSelected:menuCart){
    var isSuccess = this.validateCartItemsBeforeAdding(itemSelected);
    if(isSuccess){
      //find the corresponding element in the array and increment the quantity
      let index = this.menuDisplay.findIndex(x=>x.id == itemSelected.id);
      if(this.menuDisplay[index].quantity<20){
        this.menuDisplay[index].quantity += 1;
      //increase the cart Count
      this.share.updateCartCount(true); 
      //add in session strorage
      //this.addItemsInSessionStorage(index,1);
        //call session storage API
        let menu = this.menuDisplay[index];
        if(menu != undefined){
          //let quantity = new UpdateBasketService(this.httpclient,"StoreUserBasketValue",menu);
        }
      }else{
        this.showWarn("Cannot add more than 20 items..");
      }
    }else{
      //remove the items from the list of diffrent vendors before adding them users will be asked before that
      this.showConfirm();
    }
    
  }

  removeItemsFromCart(itemeSelected:menuCart){
    //find the corresponding element in the array and decrement the quantity
    let index = this.menuDisplay.findIndex(x=>x.id == itemeSelected.id);
    if(this.menuDisplay[index].quantity>0){
      this.menuDisplay[index].quantity -= 1; 
    //decrease the cart Count
      this.share.updateCartCount(false);
      //update in session strorage
      //this.addItemsInSessionStorage(index,2);
        //call session storage API
        let menu = this.menuDisplay[index];
        if(menu != undefined){
          //let quantity = new UpdateBasketService(this.httpclient,"UpdateUserBasket",menu);
        }
    }else{
      this.showWarn("Reached minimum quantity");
    }
  }

  //used for both operation flag 1 for adding and flag 2 for removing
  // addItemsInSessionStorage(index:number,flag:number){
  //   let item = this.menuDisplay[index];
  //   //If adding the item for the first time
  //   if(sessionStorage.getItem('cartDetails')==null){
  //     let obj = [];
  //     obj.push(item);
  //     sessionStorage.setItem('cartDetails',JSON.stringify(obj));
  //   }else{
  //     //If items are present then
  //     var i = sessionStorage.getItem('cartDetails')|| '[]';
  //     this.itemsInCart = JSON.parse(i);
      
  //     //check if the element is already present
  //     var presentIndex = this.itemsInCart.findIndex(x=>x.id==item.id);
  //     if(presentIndex!=-1){
  //       if(flag==1){
  //         //if present the increment the quanity of that item
  //         this.itemsInCart[presentIndex].quantity+=1;
  //       }else{
  //         this.itemsInCart[presentIndex].quantity-=1;
  //       }
  //       //if the items becomes zero then remove the item from the list --this scenario is for removing items
  //       if(this.itemsInCart[presentIndex].quantity == 0){
  //           this.itemsInCart.splice(presentIndex,1);
  //       }
  //       //update in storage
  //       sessionStorage.clear();
  //       //if there is items in ItemsInCart only then add the cartItem in storage
  //       if(this.itemsInCart.length>0){
  //         sessionStorage.setItem('cartDetails',JSON.stringify(this.itemsInCart));
  //       }
  //     }else{
  //       //add the item in the storage
  //       this.itemsInCart.push(item);
  //       sessionStorage.clear();
  //       sessionStorage.setItem('cartDetails',JSON.stringify(this.itemsInCart));
  //     }
  //   }
    
  // }
  
  //items from diffrent vedors cannot be mixed
  validateCartItemsBeforeAdding(itemeSelected:menuCart):boolean{
    //if items are present
    if(sessionStorage.getItem('cartDetails')!=null){
      //check if the item is of same vendor
      let items  = sessionStorage.getItem('cartDetails')|| '[]';
      let currentItemInCart:menuCart[] = JSON.parse(items);

      if(currentItemInCart[0].vendorId == itemeSelected.vendorId){
        return true;
      }
      else
        return false;//failure
    }
    else{
      return true;//success
    }
  }

  updateTheMenuList(){
    if(sessionStorage.getItem('cartDetails')!=null){
      //get the items
      let items  = sessionStorage.getItem('cartDetails')|| '[]';
      let currentItemInCart:menuCart[] = JSON.parse(items);
      var count = 0; //for cart count

      currentItemInCart.forEach((elements)=>{
        var index = this.menuDisplay.findIndex(x=>x.id == elements.id && x.id == elements.id);
        
        count += elements.quantity;
        //update the count of cart item
        this.share.updateCartCountWithvalue(count);
        //if item is of the vendor then replace it with current item
        if(index!=-1){
          //count += elements.quantity;
          this.menuDisplay.splice(index,1,elements);
          //update the count of cart item
          //this.share.updateCartCountWithvalue(count);
        }
      });
    }
  }

  updateTheMenuListFromCache(items:menuCart[],itemFromCache:menuCart[]){
    
      let currentItemInCart:menuCart[] = itemFromCache;
      let count = 0;

      if(currentItemInCart != null){
        
            currentItemInCart.forEach((elements)=>{
            var index = items.findIndex(x=>x.id == elements.id && x.id == elements.id);
                
            count += elements.quantity;
            //update the count of cart item
            this.share.updateCartCountWithvalue(count);
            //if item is of the vendor then replace it with current item
            if(index!=-1){
                items.splice(index,1,elements);
            }
          });
      }
      
      return items;
  }

  backToVendor():void{
    //route back to vendor
    this.router.navigateByUrl('/user/vendorlist');
  }

  showSuccess(messageContent:string) {
      this.messageService.add({key: 'tl',severity:'success', summary: 'Success', detail: messageContent});
  }

  showWarn(messageContent:string) {
      this.messageService.add({key: 'tl',severity:'warn', summary: 'Warn', detail: messageContent});
  }

  showError(messageContent:string) {
      this.messageService.add({key: 'tl',severity:'error', summary: 'Error', detail: messageContent});
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Please remove the item from diffrent vendor in order to Proceed?'});
  }

  onConfirm() {
    this.messageService.clear('c');

    //clear the cart storage
    sessionStorage.removeItem('cartDetails');
    this.share.updateCartCountWithvalue(0);
  }

  clear() {
    this.messageService.clear();
  }

  onReject() {
    this.messageService.clear('c');
  }

  ngOnDestroy():void{
    
  }

}
