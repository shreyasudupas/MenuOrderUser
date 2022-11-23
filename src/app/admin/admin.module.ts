import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/admin-home.component';
import { AdminGaurd } from '../helper/Gaurds/adminGaurd';
import { SharedModule } from '../shared/shared.module';
import { PrimeNGModule } from '../primeng.module';
import { VendorComponent } from './components/vendor/vendor.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    HomeComponent,
    VendorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    PrimeNGModule
  ],
  providers: [ AdminGaurd ]
})
export class AdminModule { }
