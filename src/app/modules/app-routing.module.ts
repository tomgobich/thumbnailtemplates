import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { HomeComponent } from '../routes/home/home.component';
import { LoginComponent } from '../routes/login/login.component';

const routes: Routes = [
   { path: '',          component: HomeComponent }
  ,{ path: 'login',     component: LoginComponent,   data: { login: true } }
  ,{ path: 'signup',    component: LoginComponent,   data: { login: false } }
  ,{ path: 'protected', component: HomeComponent,    canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
