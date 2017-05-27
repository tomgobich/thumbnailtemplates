import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment/moment.module';
import { Ng2ImgToolsModule } from 'ng2-img-tools';
import { FirebaseModule } from './modules/firebase.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { Ng2UploaderModule } from 'ng2-uploader'
import { ClickOutsideModule } from 'ng-click-outside'
import { UploadModule } from './routes/upload/upload.module'

import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { ThumbService } from './services/thumb.service';
import { UtilitiesService } from './services/utilities.service'
import { ValidateService } from './services/validate.service'
import { ApiAuthService } from './services/api/api-auth.service'
import { ApiThumbService } from './services/api/api-thumb.service'


import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { HeaderPartialComponent } from './partials/header/header.partial.component';
import { ResponsiveAdComponent } from './partials/responsive-ad/responsive-ad.component';
import { ThumbnailComponent } from './partials/thumbnail/thumbnail.component';
import { ProfileComponent } from './routes/user/profile/profile.component';

// TODO: Move into own module!!!
import { SignupComponent } from './routes/signup/signup.component'
import { LoginComponent } from './routes/login/login.component';
import { EmailComponent } from './partials/form-inputs/email.component';
import { PasswordComponent } from './partials/form-inputs/password.component';
import { PasswordConfirmComponent } from './partials/form-inputs/password-confirm.component'
import { UsernameComponent } from './partials/form-inputs/username.component'
import { YouTubeComponent } from './partials/form-inputs/youtube.component'
import { TwitterComponent } from './partials/form-inputs/twitter.component'
import { FacebookComponent } from './partials/form-inputs/facebook.component'
import { BioComponent } from './partials/form-inputs/bio.component'

import 'rxjs/Rx';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderPartialComponent,
    ResponsiveAdComponent,
    ThumbnailComponent,
    ProfileComponent,
    LoginComponent,
    SignupComponent,
    EmailComponent,
    PasswordComponent,
    PasswordConfirmComponent,
    UsernameComponent,
    YouTubeComponent,
    TwitterComponent,
    FacebookComponent,
    BioComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    FirebaseModule,
    MomentModule,
    Ng2ImgToolsModule,
    Ng2UploaderModule,
    ClickOutsideModule,
    UploadModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
    ThumbService,
    UtilitiesService,
    ValidateService,
    ApiAuthService,
    ApiThumbService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
