import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './OtherComponents/login/login.component';
import { LoginlogoutComponent } from './OtherComponents/loginlogout/loginlogout.component';
import { PageNotFoundComponent } from './shared/component/NotFound/page-not-found.component';
import { SigninRedirectCallbackComponent } from './shared/component/signIn-redirect-callBack/signin-redirect-callback.component';

const routes: Routes = [
  //{path:'',component:FirstComponent},
  {path:'user',loadChildren:()=> import('./UserComponent/user.module').then(m=>m.UserModule)},
  // {path:'login',component:LoginlogoutComponent}
  { path:'login',component:LoginComponent },
  { path:'signin-callback',component:SigninRedirectCallbackComponent },
  { path:'404' , component:PageNotFoundComponent },
  { path:'*' , redirectTo:'/404',pathMatch:'full' }
  //{path:'',redirectTo:'dashboard',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
