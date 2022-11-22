import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { MenuActiveItem } from "../../Models/menu-service/menu-model";
import { ResourceServiceForkRequest } from "../../Models/resouce-service/ResourceServiceForkRequest";
import { DataSharingService } from "../../Services/data-sharing.service";
import { MenuService } from "../../Services/menu.service";
import { ResourceService } from "../../Services/Resouce.service";

export class BaseComponent<T> extends ResourceService<T>{

    public componentName:any;
    private activeMenuList:MenuActiveItem;
    
    public action:string;
    public versionUrl:string;

    constructor(public _menuService:MenuService,public httpclient:HttpClient,public _broadcastService:DataSharingService){
        super(httpclient);
        
    }

    public InitilizeMenu(){
        //get menu list
        this.activeMenuList = this._menuService.getActiveMenuItemInTheList(this.componentName);

        //send updated list to component
        this._broadcastService.sendUpdatedMenuList(this.activeMenuList);

    }

    public getForkItems(request:ResourceServiceForkRequest):Observable<any[]>{
        return this.getItemsByFork(request);
    }

    public ListItems(params:HttpParams):Observable<T[]> {   
        //console.log(this.action , this.versionUrl) ;
        if(this.action == undefined || this.action == null){
            this.requestUri = this.versionUrl;
        }
        else{
            this.requestUri = this.versionUrl + '/' + this.action;
        }
        
        return this.listItems(params);
    }

    public Create(body:any):Observable<T>{
        
        if(this.action == undefined || this.action == null){
            this.requestUri = this.versionUrl;
        }
        else{
            this.requestUri = this.versionUrl + '/' + this.action;
        }
        return this.createItem(body);
    }

    public GetItem(param:HttpParams):Observable<T>{
        
        if(this.action == undefined || this.action == null){
            this.requestUri = this.versionUrl;
        }
        else{
            this.requestUri = this.versionUrl + '/' + this.action;
        }
        return this.getItem(param);
    }

    public UpdateItem(body:any){
        if(this.action == undefined || this.action == null){
            this.requestUri = this.versionUrl;
        }
        else{
            this.requestUri = this.versionUrl + '/' + this.action;
        }

        return this.updateItem(body);
    }

    public delete(queryParams: HttpParams): Observable<T> {
        if(this.action == undefined || this.action == null){
            this.requestUri = this.versionUrl;
        }
        else{
            this.requestUri = this.versionUrl + '/' + this.action;
        }
        return this.deleteItem(queryParams);
    }


}