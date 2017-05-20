import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuardService } from '../services/auth-guard.service'
import { HomeComponent } from '../routes/home/home.component'
import { LoginComponent } from '../routes/login/login.component'
import { SignupComponent } from '../routes/signup/signup.component'
import { ProfileComponent } from '../routes/user/profile/profile.component'

const routes: Routes = [
   {
     path: ''
    ,component: HomeComponent
  }
  ,{
     path: 'login'
    ,component: LoginComponent
  }
  ,{
     path: 'signup'
    ,component: SignupComponent
  }
  ,{
     path: 'user/:username'
    ,component: ProfileComponent
  }
  ,{
     path: 'protected'
    ,component: HomeComponent
    ,canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
