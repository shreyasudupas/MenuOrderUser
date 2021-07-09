import { menuCart } from "./menuCart";

export interface UserCacheInfo{
    userInfo:UserInfo;
    items:menuCart[]
}

interface UserInfo{
    id:bigint;
    userName:string;
    roleName:string
    fullName:string;
    address:string;
    cityName:string
    stateName:string
    pictureLocation:string;
}