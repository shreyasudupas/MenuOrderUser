import { UserInfo } from "../UserProfile";
import { CartUserVendorDetails } from "./CartUserVendorDetails";

export class UserCartInformation{
    UserInfo:UserInfo;
    Items:any[];
    VendorDetails:CartUserVendorDetails;
}