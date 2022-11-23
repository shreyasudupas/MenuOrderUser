import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGaurd } from '../helper/Gaurds/adminGaurd';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard.component';
import { HomeComponent } from './components/home/admin-home.component';
import { VendorComponent } from './components/vendor/vendor.component';

const routes: Routes = [
  { path:'', component: AdminDashboardComponent,canActivate:[AdminGaurd], data: { roles: ['admin'] }, children: [
      {
        path: 'home', component: HomeComponent
      },
      {
        path:'vendor', component: VendorComponent
      },
      { 
        path:'',
        redirectTo:'home',
        pathMatch:'full' 
      }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
