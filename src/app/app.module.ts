import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment/moment.module';
import { Ng2ImgToolsModule } from 'ng2-img-tools';
import { FirebaseModule } from './firebase.module';
import { AppRoutingModule } from './app-routing.module';
import { Ng2UploaderModule } from 'ng2-uploader'
import { ClickOutsideModule } from 'ng-click-outside'
import { UploadModule } from './routes/upload/upload.module'
import { UserModule } from './routes/user/user.module'

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

import 'rxjs/Rx';
import { BrowseThumbnailsComponent } from './routes/browse/thumbnails/browse-thumbnails.component';

// TODO: Match type check casing

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderPartialComponent,
    ResponsiveAdComponent,
    ThumbnailComponent,
    ProfileComponent,
    BrowseThumbnailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    FirebaseModule,
    MomentModule,
    Ng2ImgToolsModule,
    Ng2UploaderModule,
    ClickOutsideModule,
    UploadModule,
    UserModule
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
