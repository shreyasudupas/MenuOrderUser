import { Injectable } from '@angular/core';
import { MenuActiveItem, MenuNavigationModel } from '../Models/menu-service/menu-model';

@Injectable({
    'providedIn':'root'
})

export class MenuService{

    constructor(){

    }

    menu: MenuActiveItem;

    public menuList:MenuNavigationModel[] = [
        {
            parent :'user',
            items : [
                {
                    label: 'Home',
                    icon: 'pi pi-fw pi-home',
                    routerLink: ['./home']
                },
                {
                    label: 'Vendor',
                    icon: 'pi pi-fw pi-calendar',
                    routerLink:['./vendorlist']
                },
                {
                    label: 'Menu', 
                    icon: 'pi pi-fw pi-calendar',
                    visible:false
                },
                {
                    label: 'Cart', 
                    icon: 'pi pi-fw pi-calendar',
                    visible:false
                },
                {
                    label: 'Profile', 
                    icon: 'pi pi-fw pi-pencil',
                    routerLink:['./user-profile']
                },
                {
                    label: 'Payment', 
                    icon: 'pi pi-fw pi-file',
                    routerLink:['./user-payment']
                },
                {
                    label: 'Settings', 
                    icon: 'pi pi-fw pi-cog'
                }
            ]
        }
    ]; 
    

    getActiveMenuItemInTheList(componentName:any):MenuActiveItem {
        
        if(componentName != null){
            let name:string = componentName;
            var getFirstName = name.split(/(?=[A-Z])/);

            var newMenuList = new MenuService().menuList;
            //compare the name with the first name
            var findParentMenuListId = newMenuList.findIndex(item => item.parent == 'user');

            if(findParentMenuListId > -1){
                //compare first name of the component and label
                var CurrentMenuId = newMenuList[findParentMenuListId].items.findIndex(item => item.label == getFirstName[0]);

                if(CurrentMenuId > -1){
                    newMenuList[findParentMenuListId].items[CurrentMenuId].visible = true;

                    this.menu = {
                        activeMenu : newMenuList[findParentMenuListId].items[CurrentMenuId],
                        itemList : newMenuList[findParentMenuListId].items
                    };

                    return this.menu;
                }
                else{
                    //default to user home
                    this.menu = {
                        activeMenu : newMenuList[findParentMenuListId].items[0],
                        itemList : newMenuList[findParentMenuListId].items
                    };

                    return this.menu;
                }
            }else{
                //if profile doesnt match user or admin then default to home user
                this.menu = {
                    activeMenu : newMenuList[0].items[0],
                    itemList : newMenuList[0].items
                };
                return this.menu;
            }
        }else{
            let defaultMenu = [{label: 'Home', icon: 'pi pi-fw pi-home',routerLink: ['./home'],visible:true}];

             //default to user home
             this.menu = {
                activeMenu : defaultMenu[0],
                itemList : defaultMenu
            };

            return this.menu;
        }
    }
}