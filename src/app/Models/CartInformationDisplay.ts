export class CartInformationDisplay{
    vendorName:string;
    itemList:CartItems[];
    
}

class CartItems{
    menuItem:string;
    price:number;
    offerPrice:number;
    quantity:number;
}