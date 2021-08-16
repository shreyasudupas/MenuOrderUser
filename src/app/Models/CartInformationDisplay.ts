export class CartInformationDisplay{
    vendorId:string;
    vendorName:string;
    itemList:CartItems[];
    
}

class CartItems{
    menuItem:string;
    price:number;
    offerPrice:number;
    quantity:number;
}