import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';

const routes: Routes = [
  {path:'',component:FirstComponent},
  {path:'user',loadChildren:()=> import('./UserComponent/user.module').then(m=>m.UserModule)}//,
  //{path:'',redirectTo:'dashboard',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
