export class UserInfo{
    userId:string;
    username:string;
    email:string;
    phoneNumber:string;
    imagePath:string;
    points:bigint;
    cartAmount:number;
    address:UserAddress[];
    // errorDescription:string[];
    // status:number;
}

export class UserAddress{
    userAddressId:bigint;
    fullAddress:string;
    city:string;
    state:string;
    area:string;
    isActive:boolean;
}