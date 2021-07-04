export class CartInformationDisplay{
    vendorId:bigint;
    vendorName:string;
    itemList:CartItems[];
    
}

class CartItems{
    menuItem:string;
    price:number;
    offerPrice:number;
    quantity:number;
}