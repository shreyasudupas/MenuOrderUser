import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSharingService } from 'src/app/Services/data-sharing.service';
import { MenuService } from 'src/app/Services/menu.service';
import { BaseComponent } from 'src/app/shared/component/base-component';

@Component({
    selector:'app-vendor',
    templateUrl: './vendor.component.html'
})

export class VendorComponent extends BaseComponent<void> implements OnInit{

    constructor(
        private menuService:MenuService,
        public httpclient:HttpClient,
        public broadcastService:DataSharingService,
        private activatedRoute:ActivatedRoute
    ){
        super(menuService,httpclient,broadcastService)
    }

    vendorList:any = [
        { id:1,name:'A2B',category:'Vegiterian',location:'Bangalore',type:'Restaurent' },
        { id:2,name:'A2B',category:'Vegiterian/Non Veg',location:'Bangalore',type:'Fast Food' },
        { id:3,name:'Test Cafe',category:'Vegiterian/Non Veg',location:'Bangalore',type:'Cafe' }
    ]

    ngOnInit(): void {
        this.componentName = this.activatedRoute.snapshot.routeConfig?.component?.name;

        this.InitilizeMenu();
    }
    
}