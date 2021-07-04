import { ResourceService } from "./Resouce.service";
import { environment as env } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { APIResponse } from "../Models/APIResponse";

export class BasketService extends ResourceService<APIResponse>{
    action:string;
    getVersionUrl(): string {
        return env.basketAPI;
    }
    actionName(): string {
        return this.action;
    }

    constructor(client:HttpClient,_action:string) {
        super(client,'');

        this.action = _action;

        
    }

    

}