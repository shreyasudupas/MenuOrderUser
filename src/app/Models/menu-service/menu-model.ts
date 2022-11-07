import { MenuItem } from "primeng/api";

export class MenuNavigationModel{
    items:MenuItem[];
    parent:string;
}

export class MenuActiveItem{
    activeMenu:MenuItem;
    itemList:MenuItem[];
}