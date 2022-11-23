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
    ngOnInit(): void {
        this.componentName = this.activatedRoute.snapshot.routeConfig?.component?.name;

        this.InitilizeMenu();
    }
    
}