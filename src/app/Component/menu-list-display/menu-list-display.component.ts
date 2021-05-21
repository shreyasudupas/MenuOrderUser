import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuItemList } from 'src/app/Models/MenuItemList';
import { MenuItems } from 'src/app/Models/MenuItems';
import { MenuList } from 'src/app/Models/MenuList';
import { DataServiceService } from 'src/app/Services/data-service.service';
import { DataSharingService } from 'src/app/Services/data-sharing.service';

@Component({
  selector: 'app-menu-list-display',
  templateUrl: './menu-list-display.component.html',
  styleUrls: ['./menu-list-display.component.css']
})
export class MenuListDisplayComponent implements OnInit {

  subscription:Subscription;
  itemList:MenuList;
  menuItems:MenuItems[];
  menuTypeList:MenuItemList[];
  rowGroupMetadata: any;

  constructor(private router:Router,private route:ActivatedRoute,private dataService:DataServiceService,private share:DataSharingService) { }

  ngOnInit(): void {
    
    this.subscription = this.route.paramMap.subscribe((param)=>{
      //console.log(param);
      var id = param.get('menuId') || '';
      if(id != '')
      {
        var vendorId = parseInt(id);
        this.dataService.getMenuListFromVendorId(vendorId).subscribe((response)=>{
            this.itemList = response;

            this.menuItems = this.itemList.menuItemList;
            this.menuTypeList = this.itemList.menuItemDetails;
            this.updateRowGroupMetaData();
        });
      }
    });

    //setting the active item in menu bar
    this.share.getActiveItem("Menu");
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
      console.log(this.rowGroupMetadata);
    }
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }

}
