import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './OtherComponents/login/login.component';
import { LoginlogoutComponent } from './OtherComponents/loginlogout/loginlogout.component';

const routes: Routes = [
  //{path:'',component:FirstComponent},
  {path:'user',loadChildren:()=> import('./UserComponent/user.module').then(m=>m.UserModule)},
  // {path:'login',component:LoginlogoutComponent}
  {path:'login',component:LoginComponent}
  //{path:'',redirectTo:'dashboard',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
