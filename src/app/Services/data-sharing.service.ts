import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfo } from '../Models/user/UserProfile';
//import { menuCart } from '../Models/menuCart';

@Injectable({providedIn: 'root'})

export class DataSharingService {
  
  //assigning a default value
  private activeitemSource = new BehaviorSubject<string>("Home");
  //currentItem = this.activeitemSource.asObservable();

  //cart count
  private itemsAddedToCartCount = new BehaviorSubject<number>(0);
  //userProfile
  private userProfile = new BehaviorSubject<UserInfo>(new UserInfo());

  constructor() { }

  getCurrentItem():Observable<string>{
    return this.activeitemSource.asObservable();
  }

  getActiveItem(activeMenuItem:string){
    this.activeitemSource.next(activeMenuItem);
  }

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

  getCurrentUserInfo(){
    return this.userProfile.asObservable();
  }

  updateUserInfo(value:UserInfo){
    this.userProfile.next(value);
  }
}
