import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse } from '../Models/APIResponse';
import { map, catchError } from 'rxjs/operators';
import { MenuList } from '../Models/MenuList';
import { environment as env } from '../../environments/environment';
import { UserInfo } from '../Models/UserProfile';
import { createElementCssSelector } from '@angular/compiler';

@Injectable()

export class DataServiceService {
urlv1:string = env.baseV1Url;
urlv2:string = env.baseV2Url;
menuList:MenuList;

  constructor(private http:HttpClient) { }

  public getVendorList():Observable<APIResponse>{
    return this.http.get<APIResponse>(this.urlv1+'Vendor/GetVendorList')
    .pipe(map((response:APIResponse)=>{
      var result = new APIResponse();
      if(response.response == 200){
        result = response;
        return result;
      }
      else{
        this.handleCustomErrorSentByAPI(response);
      }
      return result;
    }));
  }

  public getMenuListFromVendorId(VendorId:number):Observable<MenuList>{
    return this.http.get<any>(this.urlv1+'Menu/GetMenuList?VendorId='+ VendorId)
    .pipe(map((response:APIResponse)=>{
      //If success then display this
      if(response.response == 200){
        let res = response.content;
      return this.menuList=Object.assign(res);
      }
      else{
        this.handleCustomErrorSentByAPI(response);
      }
      
    }));
  }

  public handleCustomErrorSentByAPI(response:APIResponse){
    let errorMessage = "";
    if(response.response == 500){
      errorMessage = "Error Occurred in API: " + response.exception;
    }
    else if(response.response=404){
      errorMessage = "Error Occurred in API item not found ";
    }
    window.alert(errorMessage);
  }

  public getUserInfo(userInfo:UserInfo):Observable<any>{
    return this.http.post<any>(this.urlv1+'User/GetOrUpdateUserDetails',userInfo)
    .pipe(map((result:APIResponse)=>{
      //if success
      if(result.response == 200){
        return result.content;
      }
      else{
        this.handleCustomErrorSentByAPI(result);
        return null;
      }
    }));
  }
}
