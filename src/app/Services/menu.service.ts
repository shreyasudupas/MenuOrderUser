import { Injectable } from '@angular/core';
import { AuthService } from '../helper/service/Autho.service';
import { MenuActiveItem, MenuNavigationModel } from '../Models/menu-service/menu-model';

@Injectable({
    'providedIn':'root'
})

export class MenuService{

    constructor(private authService:AuthService){
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
        },
        {
            parent :'admin',
            items : [
                {
                    label: 'Home',
                    icon: 'pi pi-fw pi-home',
                    routerLink: ['./home']
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

            //compare the name with the first name
            var role = this.authService.GetUserRole();

            var findParentMenuListId = this.menuList.findIndex(item => item.parent == role);

                if(findParentMenuListId > -1){
                    //compare first name of the component and label
                    var CurrentMenuId = this.menuList[findParentMenuListId].items.findIndex(item => item.label == getFirstName[0]);
    
                    if(CurrentMenuId > -1){
                        this.menuList[findParentMenuListId].items[CurrentMenuId].visible = true;
    
                        this.menu = {
                            activeMenu : this.menuList[findParentMenuListId].items[CurrentMenuId],
                            itemList : this.menuList[findParentMenuListId].items
                        };
    
                        return this.menu;
                    }
                    else{
                        //default to user home
                        this.menu = {
                            activeMenu : this.menuList[findParentMenuListId].items[0],
                            itemList : this.menuList[findParentMenuListId].items
                        };
    
                        return this.menu;
                    }
                } else {
                    //if profile doesnt match user or admin then default to home user
                    this.menu = {
                        activeMenu : this.menuList[0].items[0],
                        itemList : this.menuList[0].items
                    };
                    return this.menu;
                }   
        }else{
            this.defaultMenu();
        };
        return this.menu;
    }

    private defaultMenu = () => {
        let defaultMenu = [{label: 'Home', icon: 'pi pi-fw pi-home',routerLink: ['./home'],visible:true}];

        //default to user home
        this.menu = {
           activeMenu : defaultMenu[0],
           itemList : defaultMenu
       };
    }
}