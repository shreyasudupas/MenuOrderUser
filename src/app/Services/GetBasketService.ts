import { HttpClient } from "@angular/common/http";
import { environment as env } from 'src/environments/environment';
import { APIResponse } from "../Models/api-response/APIResponse";
import { map } from "rxjs/operators";

export class GetBasketService{
    action:string;
    apiUrls:string = env.cartInfoAPI;
    
    constructor(private httpClient:HttpClient,action:string) {
        this.apiUrls +=action;
    }

    public GetAllItems():Promise<string> {
        
        return new Promise((resolve, reject) => {
            this.httpClient.get<APIResponse>(this.apiUrls).pipe(map((data:any)=>{
                if(data.statusCode == 200){
                    return data.content;
                }else
                {
                    return null;
                }
            })).subscribe((result)=>{
                if(result != null){

                    resolve(result);
                }else{
                    reject("No cache Item");
                }
                
            }, (err)=>reject(err));
            
        });
        
    }
}