import { UserInfo } from "../user/UserProfile";

export class PaymentScreenResponse{
    userInfo:UserInfo;
    totalAmount:number;
    lastSelectedPaymentMode:string;
}