import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { MomentModule } from 'angular2-moment/moment.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { ThumbService } from './services/thumb.service';
import { LoginPartialComponent } from './partials/login/login.partial.component';
import { LoginComponent } from './routes/login/login.component';
import { HomeComponent } from './routes/home/home.component';
import { HeaderPartialComponent } from './partials/header/header.partial.component';
import { FeaturedThumbnailComponent } from './partials/featured-thumbnail/featured-thumbnail.component';
import 'rxjs/Rx';
import { ResponsiveAdComponent } from './partials/responsive-ad/responsive-ad.component';
import { ThumbnailComponent } from './partials/thumbnail/thumbnail.component';

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyAZXrgLEJPJdMe7aMMl4PsRoBNrKeXy7os",
  authDomain: "thumbnailtemplates.firebaseapp.com",
  databaseURL: "https://thumbnailtemplates.firebaseio.com",
  storageBucket: "thumbnailtemplates.appspot.com",
  messagingSenderId: "365808202826"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginPartialComponent,
    HomeComponent,
    HeaderPartialComponent,
    FeaturedThumbnailComponent,
    ResponsiveAdComponent,
    ThumbnailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    MomentModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
    ThumbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
