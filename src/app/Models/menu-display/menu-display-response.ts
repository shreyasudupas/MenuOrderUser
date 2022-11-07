export class MenuDisplayReponse{
    menuColumnDetail:Array<MenuColumnDetail>;
    data:Array<any>;
}

export class MenuColumnDetail{
    field:string;
    header:string;
    display:string;
}

export interface MenuCartData extends Record<string,any>{
    quantity:number;
}