import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})

export class DataSharingService {
  
  //assigning a default value
  private activeitemSource = new BehaviorSubject<string>("Home");
  //currentItem = this.activeitemSource.asObservable();

  constructor() { }

  getCurrentItem():Observable<string>{
    return this.activeitemSource.asObservable();
  }

  getActiveItem(activeMenuItem:string){
    this.activeitemSource.next(activeMenuItem);
  }


}
