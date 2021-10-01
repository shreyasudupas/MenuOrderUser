export class MenuDisplayReponse{
    menuColumnData:Array<MenuColumnData>;
    data:Array<any>;
}

export class MenuColumnData{
    field:string;
    header:string;
    display:string;
}

export interface MenuCartData extends Record<string,any>{
    quantity:number;
}