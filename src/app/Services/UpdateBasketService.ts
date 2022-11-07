import { environment as env } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";

export class UpdateBasketService{
    action: string;

    constructor(private client:HttpClient) {
    }

    UpdateCartInformation(action:string,headerContent:any):Promise<any>{
        let url = env.cartInfoAPI+ action;
        
        let headers = new HttpHeaders();
        headers=headers.append('cart-info', JSON.stringify(headerContent));
                
        return new Promise<any>((resolve, reject) =>{
            this.client.get<any>(url,{'headers':headers}).toPromise().then((response:any )=> {
                if(response.statusCode == 200){
                     resolve(response.content);
                }else{
                    reject(response.statusCode);
                }
            }).catch(err=>reject(err));
        });
        
    }
}
