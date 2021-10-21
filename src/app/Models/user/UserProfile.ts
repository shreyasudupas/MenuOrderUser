export class UserInfo{
    Id:bigint;
    userName:string;
    roleName:string;
    nickname:string;
    pictureLocation:string;
    points:bigint;
    cartAmount:number;
    address:UserAddress[];
}

export class UserAddress{
    userAddressId:bigint;
    fullAddress:string;
    city:string;
    state:string;
    isActive:boolean;
}