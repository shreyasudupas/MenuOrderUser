import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSharingService } from 'src/app/Services/data-sharing.service';

@Component({
  selector: 'cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.css']
})
export class CartIconComponent implements OnInit {
  cartItemNumber:string;

  constructor(private share:DataSharingService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    //this.cartItems = "3" ;

    this.share.getCurrentCartCount().subscribe((cartnumber)=>{
      var i = cartnumber;
      this.cartItemNumber = i.toString();
    });
  }

  navigateToCartPage():void{
    this.router.navigate(['./cart-information'],{relativeTo:this.route})
  }

}
