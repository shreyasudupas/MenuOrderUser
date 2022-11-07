import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user.routing.module';
import { HomeComponent } from './home/home.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { PrimeNGModule } from '../primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartIconComponent } from './cart-icon/cart-icon.component';
import { CartInformationComponent } from './cart-information/cart-information.component';
import { ProfileComponent } from './profile/profile.component';
import { UserProfileComponent } from '../Utilities/user-profile/user-profile.component';
import { MenuBarComponent } from '../Utilities/menu-bar/menu-bar.component';
import { ModalComponent } from '../Utilities/modal/modal.component';
import { PaymentScreenComponent } from './payment-screen/payment-screen.component';
import { DropDownListComponent } from '../Utilities/DropDownList/drop-down-list.component';
import { MenuDisplayComponent } from './menu-display/menu-display.component';
import { AppUserGaurd } from '../helper/Gaurds/AppUserGaurd';
import { ToastMessageComponent } from '../Utilities/toast-message/toast-message.component';


@NgModule({
  declarations: [
    HomeComponent,
    VendorListComponent,
    UserDashboardComponent,
    CartIconComponent,
    CartInformationComponent,
    ProfileComponent,
    UserProfileComponent,
    MenuBarComponent,
    ModalComponent,
    PaymentScreenComponent,
    DropDownListComponent,
    MenuDisplayComponent,
    ToastMessageComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[AppUserGaurd]
})
export class UserModule { }
