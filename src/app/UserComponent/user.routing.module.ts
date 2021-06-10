import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartInformationComponent } from './cart-information/cart-information.component';
import { HomeComponent } from './home/home.component';
import { MenuListDisplayComponent } from './menu-list-display/menu-list-display.component';
import { ProfileComponent } from './profile/profile.component';
import { UserFirstComponent } from './user-first/user-first.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';

const routes: Routes = [
  {path:'',component:UserFirstComponent,children:[
    {path:'home',component:HomeComponent},
    {path:'vendorlist',component:VendorListComponent},
    {path:'menulist',component:MenuListDisplayComponent},
    {path:'cart-information',component:CartInformationComponent},
    {path:'user-profile',component:ProfileComponent},
    {path:'',redirectTo:'home',pathMatch:'full'}
  ]}
    
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class UserRoutingModule {}