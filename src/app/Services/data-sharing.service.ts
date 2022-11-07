import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuActiveItem } from '../Models/menu-service/menu-model';
import { UserInfo } from '../Models/user/UserProfile';
//import { menuCart } from '../Models/menuCart';

@Injectable({providedIn: 'root'})

export class DataSharingService {
  constructor() { }

  ///////////////////////////////////////////////////////
  //assign default menuList options
  private menuList = new BehaviorSubject<MenuActiveItem>(new MenuActiveItem());

  getActiveMenuList():Observable<MenuActiveItem>{
    return this.menuList.asObservable();
  }

  sendUpdatedMenuList(updatedList:MenuActiveItem){
    this.menuList.next(updatedList);
  }
///////////////////////////////////////////////////////

 //cart count
 private itemsAddedToCartCount = new BehaviorSubject<number>(0);

  getCurrentCartCount():Observable<number>{
    return this.itemsAddedToCartCount.asObservable();
  }

  updateCartCount(flag:boolean){
    var currentCount = this.itemsAddedToCartCount.getValue();
    if(flag==true){ //to increase the count
      currentCount+=1;
    }
    else  //to decrease the count
      currentCount-=1;

    this.itemsAddedToCartCount.next(currentCount);
  }
  updateCartCountWithvalue(value:number){
    this.itemsAddedToCartCount.next(value);
  }

  ////////////////////////////////////////////////////
   //userProfile
   private userProfile = new BehaviorSubject<UserInfo>(new UserInfo());

  getCurrentUserInfo(){
    return this.userProfile.asObservable();
  }

  updateUserInfo(value:UserInfo){
    this.userProfile.next(value);
  }

  ///////////////////////////////////////////////////////

  //Add the Location/Locality
  private userLocation = new BehaviorSubject<string>('');

  updateUserLocality(location:string){
    this.userLocation.next(location);
  }

  getUserLocality():Observable<string>{
    return this.userLocation.asObservable();
  }

  ///////////////////////////////////////////////////////
}
