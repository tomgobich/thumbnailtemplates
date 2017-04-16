import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './routes/home/home.component';
import { LoginComponent } from './routes/login/login.component';
import { SignupComponent } from './routes/signup/signup.component';

const routes: Routes = [
   { path: '',         component: HomeComponent }
  ,{ path: 'login',    component: LoginComponent,   data: { login: true } }
  ,{ path: 'signup',   component: LoginComponent,   data: { login: false } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
