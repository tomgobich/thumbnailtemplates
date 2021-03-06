import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuardService } from '../services/auth-guard.service'
import { HomeComponent } from '../routes/home/home.component'
import { LoginComponent } from '../routes/user/login/login.component'
import { SignupComponent } from '../routes/user/signup/signup.component'
import { ProfileComponent } from '../routes/user/profile/profile.component'
import { BrowseThumbnailsComponent } from '../routes/thumbnails/browse/browse-thumbnails.component'
import { ThumbnailTemplateComponent } from '../routes/thumbnails/thumbnail-template/thumbnail-template.component'
import { ThumbnailComponent as UploadThumbnail } from '../routes/upload/thumbnail/thumbnail.component'

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
     path: 'thumbnails'
    ,component: BrowseThumbnailsComponent
  }
  ,{
     path: 'thumbnails/browse'
    ,component: BrowseThumbnailsComponent
  }
  ,{
     path: 'thumbnails/template/:alias'
    ,component: ThumbnailTemplateComponent
  }
  ,{
     path: 'thumbnails/browse/:category/:activePage'
    ,component: BrowseThumbnailsComponent
  }
  ,{
     path: 'protected'
    ,component: HomeComponent
    ,canActivate: [AuthGuardService]
  }
  ,{
     path: 'upload/thumbnail'
    ,component: UploadThumbnail
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
