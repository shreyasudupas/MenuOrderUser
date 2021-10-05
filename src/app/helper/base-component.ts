import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MenuActiveItem } from "../Models/menu-service/menu-model";
import { ResourceServiceForkRequest } from "../Models/resouce-service/ResourceServiceForkRequest";
import { DataSharingService } from "../Services/data-sharing.service";
import { MenuService } from "../Services/menu.service";
import { ResourceService } from "../Services/Resouce.service";

export class BaseComponent<T> extends ResourceService<T>{
    getVersionUrl(): string {
        return this.versionUrl;
    }
    actionName(): string {
        return this.action;
    }

    public componentName:any;
    private activeMenuList:MenuActiveItem;
    
    public action:string;
    public versionUrl:string;

    constructor(public _menuService:MenuService,public httpclient:HttpClient,public _broadcastService:DataSharingService){
        super(httpclient,'');
        
    }

    public Initilize(){
        //get menu list
        this.activeMenuList = this._menuService.getActiveMenuItemInTheList(this.componentName);

        //send updated list to component
        this._broadcastService.sendUpdatedMenuList(this.activeMenuList);

    }

    public getForkItems(request:ResourceServiceForkRequest):Observable<any[]>{
        return this.getItemsByFork(request);
    }

    public ListItems():Observable<T[]> {   
        //console.log(this.action , this.versionUrl) ;
        this.requestUri = this.versionUrl+this.action;
        return this.listItems();
    }


}