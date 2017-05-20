import 'rxjs/Rx';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment/moment.module';
import { Ng2ImgToolsModule } from 'ng2-img-tools';
import { FirebaseModule } from './modules/firebase.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { ThumbService } from './services/thumb.service';
import { UtilitiesService } from './services/utilities.service'
import { ValidateService } from './services/validate.service'
import { ApiAuthService } from './services/api/api-auth.service'

import { HomeComponent } from './routes/home/home.component';
import { HeaderPartialComponent } from './partials/header/header.partial.component';
import { ResponsiveAdComponent } from './partials/responsive-ad/responsive-ad.component';
import { ThumbnailComponent } from './partials/thumbnail/thumbnail.component';
import { ProfileComponent } from './routes/user/profile/profile.component';

// Login / Signup Components
import { LoginComponent } from './routes/login/login.component';
import { LoginPartialComponent } from './partials/login/login.partial.component'; // old <to be removed>
import { EmailComponent } from './partials/form-inputs/email.component';
import { PasswordComponent } from './partials/form-inputs/password.component';
import { UsernameComponent } from './partials/form-inputs/username.component'
import { SignupComponent } from './routes/signup/signup.component'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderPartialComponent,
    ResponsiveAdComponent,
    ThumbnailComponent,
    ProfileComponent,
    LoginComponent,
    LoginPartialComponent,
    EmailComponent,
    PasswordComponent,
    UsernameComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    FirebaseModule,
    MomentModule,
    Ng2ImgToolsModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
    ThumbService,
    UtilitiesService,
    ValidateService,
    ApiAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
