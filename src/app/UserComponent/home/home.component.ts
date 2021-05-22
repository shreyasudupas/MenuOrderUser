import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataSharingService } from 'src/app/Services/data-sharing.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  subscription: Subscription;

  constructor(private sharing:DataSharingService) { }

  ngOnInit(): void {

    this.sharing.getActiveItem("Home");    
  }

  ngOnDestroy(){
    console.log("Home destroyed");
  }

}
