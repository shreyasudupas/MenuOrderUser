import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from '../Utilities/menu-bar/menu-bar.component';
import { PrimeNGModule } from '../primeng.module';
import { UserProfileComponent } from '../Utilities/user-profile/user-profile.component';



@NgModule({
  declarations: [
    MenuBarComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    PrimeNGModule
  ],
  exports:[
    MenuBarComponent,
    UserProfileComponent
  ]
})
export class SharedModule { }
