import { HttpClient } from "@angular/common/http";
import { menuCart } from "../Models/menuCart";
import { ResourceService } from "./Resouce.service";
import { environment as env } from 'src/environments/environment';

export class GetBasketService extends ResourceService<menuCart>{
    action:string;
    menuCartsFromCache:menuCart[]=[];

    getVersionUrl(): string {
        return env.basketAPI;
    }
    actionName(): string {
        return this.action; //will be undefined in resource.ts
    }
    
    constructor(private httpClient:HttpClient,_action:string) {
        super(httpClient,'',_action);
    }

    public GetAllItems():Promise<menuCart[]> {
        
        return new Promise((resolve, reject) => {

            this.listItems().subscribe(result => {
                if(result.length>0){
                    this.menuCartsFromCache = result
                    resolve(this.menuCartsFromCache);
                }else {
                    reject(this.menuCartsFromCache);
                }
            });
        });
        
    }
}