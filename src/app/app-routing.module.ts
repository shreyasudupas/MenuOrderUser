import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from './shared/component/forbidden/forbidden-component';
import { PageNotFoundComponent } from './shared/component/not-found/page-not-found.component';
import { SigninRedirectCallbackComponent } from './shared/component/signIn-redirect-callBack/signin-redirect-callback.component';
import { SignoutRedirectComponent } from './shared/component/signOutRedirectCallback/signout-redirect-callback.component';

const routes: Routes = [
  //{path:'',component:FirstComponent},
  { path:'user',loadChildren:()=> import('./UserComponent/user.module').then(m=>m.UserModule) },
  { path:'admin',loadChildren:()=> import('./admin/admin.module').then(m=>m.AdminModule) },
  // {path:'login',component:LoginlogoutComponent}
  { path:'signin-callback',component:SigninRedirectCallbackComponent },
  { path:'signout-callback',component:SignoutRedirectComponent},
  { path:'404' , component:PageNotFoundComponent },
  { path:'forbidden' , component:ForbiddenComponent },
  { path:'*' , redirectTo:'/404',pathMatch:'full' }
  //{path:'',redirectTo:'dashboard',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
