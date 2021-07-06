import { ResourceService } from "./Resouce.service";
import { environment as env } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { APIResponse } from "../Models/APIResponse";

export class UpdateBasketService extends ResourceService<APIResponse>{
    action: string;
    getVersionUrl(): string {
        return env.basketAPI;
    }
    actionName(): string {
        return this.action; //this will  be undefined when called in Resource.ts hence defined in resource by passing in  super constructor
    }

    constructor(client:HttpClient,_action:string,body?:any) {
        super(client,'',_action);

            this.createItem(body).subscribe(response => { console.log(response)});
    }
}
