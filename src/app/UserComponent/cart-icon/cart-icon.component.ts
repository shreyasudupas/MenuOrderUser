import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/component/base-component';
import { CartIconReponse } from 'src/app/Models/cart-icon-response/cart-icon';
import { DataSharingService } from 'src/app/Services/data-sharing.service';
import { MenuService } from 'src/app/Services/menu.service';
import { environment as env} from 'src/environments/environment';

@Component({
  selector: 'cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.css']
})
export class CartIconComponent extends BaseComponent<CartIconReponse> implements OnInit {
  cartItemNumber:string;

  constructor(private share:DataSharingService,
    private router:Router,
    private route:ActivatedRoute,
    public menuService:MenuService,
    public http:HttpClient
    ) { 
      super(menuService,http,share);
    }

  ngOnInit(): void {
    //this.cartItems = "3" ;
    let param = new HttpParams();
    this.versionUrl = env.cartInfoAPI;
    this.action = "GetCartItem";
    this.GetItem(param).subscribe((result)=>{
      this.cartItemNumber = result.totalItems.toString();
    });

    this.share.getCurrentCartCount().subscribe((cartnumber)=>{
      var i = cartnumber;
      this.cartItemNumber = i.toString();
    });
  }

  navigateToCartPage():void{
    this.router.navigate(['./cart-information'],{relativeTo:this.route})
  }

}
