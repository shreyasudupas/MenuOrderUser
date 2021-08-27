export class CartConfiguration{
    vendorDetails:VendorDetails;
    columnDetails:ColumnDetails[];
}

export class VendorDetails{
    id:number;
    vendorName:string;
    description:string;
    location:string;
    rating:string;
}

export class ColumnDetails{
    columnName:string;
    propertyType:string;
    columnDescription:string;
    displayName:string;
    displayScreen:string;
}