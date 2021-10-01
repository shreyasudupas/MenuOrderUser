import { CartUserProfile } from "../user/CartUserProfile";
//import { UserInfo } from "../user/UserProfile";
import { CartUserVendorDetails } from "./CartUserVendorDetails";

export class UserCartInformation{
    UserInfo:CartUserProfile;
    Items:any[];
    VendorDetails:CartUserVendorDetails;
}