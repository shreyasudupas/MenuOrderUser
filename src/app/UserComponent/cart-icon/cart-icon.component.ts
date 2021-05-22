import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.css']
})
export class CartIconComponent implements OnInit {
  cartItems:string;

  constructor() { }

  ngOnInit(): void {
    this.cartItems = "3" ;
  }

}
