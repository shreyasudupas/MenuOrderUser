import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MenuCartData, MenuColumnData, MenuDisplayReponse } from 'src/app/Models/menu-display/menu-display-response';
import { menuCart } from 'src/app/Models/menuCart';
import { RequestResource, ResourceServiceForkRequest } from 'src/app/Models/ResouceService/ResourceServiceForkRequest';
import { DataSharingService } from 'src/app/Services/data-sharing.service';
import { ResourceService } from 'src/app/Services/Resouce.service';
import { UpdateBasketService } from 'src/app/Services/UpdateBasketService';
import { environment as env} from 'src/environments/environment';

@Component({
    selector: 'menu-display',
    templateUrl:'menu-display.component.html',
    providers: [MessageService]
})

export class MenuDisplayComponent extends ResourceService<MenuDisplayReponse>{
    menuResponse:MenuDisplayReponse;
    menuCartItems:MenuCartData[]=[];
    menuColumns:Array<MenuColumnData>;
    menus:Array<any>;
    rowGroupMetadata: any;
    dynamicColSpan:number=0;
    menuItems:Array<MenuCartData>;
    vendorId:string='';
    vendorName:string='';

    getVersionUrl(): string {
        return "";
    }
    actionName(): string {
        return "";
    }

    constructor(private router:Router,public httpclient:HttpClient,private BroadcastService:DataSharingService,
        private messageService:MessageService){
            super(httpclient,'')
    }

    ngOnInit(){

        this.vendorId = history.state.vendorId;
        this.vendorName = history.state.vendorName;

        if(this.vendorId == undefined || this.vendorId == null){
          //route back to vendor
          this.router.navigateByUrl('/user/vendorlist');

        }else{

            //set the params
            let menuParams = new HttpParams();
            menuParams = menuParams.append('VendorId',this.vendorId);
            
            //Fork join two calls
            let forkRequest = new ResourceServiceForkRequest();
            let RequestResource1 = new RequestResource();
            RequestResource1.requestUrl = env.menuAPI+'GetMenuList?VendorId='+this.vendorId;
            RequestResource1.httpMethod ='get';
            let RequestResource2 = new RequestResource();
            RequestResource2.requestUrl = env.cartInfoAPI+'GetUserBasketInfoFromCache';
            RequestResource2.httpMethod ='get';
            forkRequest.requestParamter = new Array<RequestResource>();
            forkRequest.requestParamter.push(RequestResource1);
            forkRequest.requestParamter.push(RequestResource2);

            this.getItemsByFork(forkRequest).subscribe(([menuResult,basketCacheResult])=>{
              this.menuResponse = menuResult;
              let cacheMenuBasket = JSON.parse(basketCacheResult);
                // if(results.length>0){
                // }
                //get menu list items
                if(menuResult != null){

                    this.menuColumns = this.menuResponse.menuColumnData;
                    this.menus = this.menuResponse.data;
                      
                    //get all columns on display
                    this.menuColumns.forEach(element=>{
                        if(element.display != "none"){
                            this.dynamicColSpan++;
                        }
                    });
  
                
                    //set the data with quantity,vendorId and name as cart information along with other properties
                    for(var i=0; i<this.menus.length;i++){
                        var newCartObject:MenuCartData={ quantity:0 };
      
                        for(var j=0; j<this.menuColumns.length;j++){
                            var currentMenu = this.menus[i];
                            //assign new columns dynamically to the new object
                            newCartObject[this.menuColumns[j].field] = currentMenu[this.menuColumns[j].field];
                        }
                        this.menuCartItems.push(newCartObject);
                    }
  
                    //push the quantity to cart items columns
                    this.menuColumns.push({ field:'quantity',header:'Quantity',display:''})
                    
                    if(cacheMenuBasket != null){
                      //check if the item is already in cache if yes then update
                      this.menuCartItems = this.updateTheMenuListFromCache(this.menuCartItems,cacheMenuBasket.Items);
                    }
                  
                  
                    this.updateRowGroupMetaData();
                }
                
            });
      
            //setting the active item in menu bar
            this.BroadcastService.getActiveItem("Menu");
        }
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};
    
        if(this.menus){
          for(var i=0;i<this.menus.length;i++){
            let rowData = this.menus[i];
            let menuTypeName = rowData["menu type"];
    
            //get image path for MenuType
            // let menuTypeDetail = this.menuTypeList.find(x=>x.menuTypeName == menuTypeName);
            // let menuPicPath = menuTypeDetail?.imagePath;
    
            if(i == 0){
            //   this.rowGroupMetadata[menuTypeName] = {index:0,size:1,imgPath:menuPicPath };
            this.rowGroupMetadata[menuTypeName] = {index:0,size:1 };
            }else{
              let previousRowData = this.menus[i-1];
              let previousRowGroup = previousRowData["menu type"];
    
              if(menuTypeName == previousRowGroup)
                this.rowGroupMetadata[menuTypeName].size++;
              else
                // this.rowGroupMetadata[menuTypeName] = {index:i,size:1,imgPath:menuPicPath};
                this.rowGroupMetadata[menuTypeName] = {index:i,size:1};
            }
          }
          //console.log(this.rowGroupMetadata);
        }
    }

    backToVendor():void{
        //route back to vendor
        this.router.navigateByUrl('/user/vendorlist');
    }

    updateTheMenuListFromCache(items:MenuCartData[],itemFromCache:any[]){
    
        let currentItemInCart:menuCart[] = itemFromCache;
        let count = 0;
  
        if(currentItemInCart != null){
          
              currentItemInCart.forEach((elements)=>{
              var index = items.findIndex(x=>x.id == elements.id && x.id == elements.id);
                  
              count += elements.quantity;
              //update the count of cart item
              this.BroadcastService.updateCartCountWithvalue(count);
              //if item is of the vendor then replace it with current item
              if(index!=-1){
                  items.splice(index,1,elements);
              }
            });
        }
        
        return items;
    }

    addItemsoCart(itemSelected:any){
        //find the corresponding element in the array and increment the quantity
        let index = this.menuCartItems.findIndex(x=>x.id == itemSelected.id);
        if(this.menuCartItems[index].quantity<20){
          this.menuCartItems[index].quantity += 1;
        //increase the cart Count
        this.BroadcastService.updateCartCount(true); 
        
          //call session storage API
          let menu = this.menuCartItems[index];
          if(menu != undefined){

            let menuData:Record<string,any> = menu;
            menuData["vendor details"] = {
              "id":this.vendorId,
              "name":this.vendorName
            }
            let body = { 
              "ColumnData":this.menuColumns,
              "Data":menuData
            }
            let service = new UpdateBasketService(this.httpclient);
            service.UpdateCartInformation('AddItemInCache',body).then((response:any) =>{
                  if(response == true)
                  this.showSuccess("Item added sucessfully");
                else
                  this.showError('Error in adding Item');
            });
             
          }
        }else{
          this.showWarn("Cannot add more than 20 items..");
        }
    }

    showWarn(messageContent:string) {
        this.messageService.add({key: 'tl',severity:'warn', summary: 'Warn', detail: messageContent});
    }

    showSuccess(messageContent:string) {
      this.messageService.add({key: 'tl',severity:'success', summary: 'Success', detail: messageContent});
  }
  showError(messageContent:string) {
    this.messageService.add({key: 'tl',severity:'error', summary: 'Error', detail: messageContent});
}
}