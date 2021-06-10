import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataServiceService } from 'src/app/Services/data-service.service';
import { UserRoutingModule } from './user.routing.module';
import { HomeComponent } from './home/home.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { MenuListDisplayComponent } from './menu-list-display/menu-list-display.component';
import { UserFirstComponent } from './user-first/user-first.component';
import { PrimeNGModule } from '../primeng.module';
import { FormsModule } from '@angular/forms';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { CartIconComponent } from './cart-icon/cart-icon.component';
import { CartInformationComponent } from './cart-information/cart-information.component';
import { ProfileComponent } from './profile/profile.component';
import { UserProfileComponent } from '../OtherComponents/user-profile/user-profile.component';



@NgModule({
  declarations: [
    HomeComponent,
    VendorListComponent,
    MenuListDisplayComponent,
    UserFirstComponent,
    MenuBarComponent,
    CartIconComponent,
    CartInformationComponent,
    ProfileComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    PrimeNGModule,
    FormsModule
  ],
  providers:[DataServiceService]
})
export class UserModule { }
