import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './routes/home/home.component';
import { LoginComponent } from './routes/login/login.component';

const routes: Routes = [
   { path: '',         component: HomeComponent, canActivate: [AuthGuardService] }
  ,{ path: 'login',    component: LoginComponent,   data: { login: true } }
  ,{ path: 'signup',   component: LoginComponent,   data: { login: false } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
