export class CartInformationDisplay{
    vendorId:number;
    vendorName:string;
    itemList:CartItems[];
    
}

class CartItems{
    menuItem:string;
    price:number;
    offerPrice:number;
    quantity:number;
}