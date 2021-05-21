import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { MenuListDisplayComponent } from './Component/menu-list-display/menu-list-display.component';
import { VendorListComponent } from './Component/vendor-list/vendor-list.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'vendorlist',component:VendorListComponent},
  {path:'menulist/:menuId',component:MenuListDisplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
