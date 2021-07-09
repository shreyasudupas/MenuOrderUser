import { HttpClient } from "@angular/common/http";
import { menuCart } from "../Models/menuCart";
import { environment as env } from 'src/environments/environment';
import { UserCacheInfo } from "../Models/UserCacheInfo";

export class GetBasketService{
    action:string;
    apiUrls:string = env.basketAPI;
    menuCartsFromCache:menuCart[]=[];

    
    constructor(private httpClient:HttpClient,action:string) {
        this.apiUrls +=action;
    }

    public GetAllItems():Promise<menuCart[]> {
        
        return new Promise((resolve, reject) => {
            this.httpClient.get<UserCacheInfo>(this.apiUrls).subscribe((result)=>{
                this.menuCartsFromCache = result.items;
                resolve(this.menuCartsFromCache);
            }, (err)=>reject(err));
            
        });
        
    }
}