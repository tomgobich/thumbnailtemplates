import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment/moment.module';
import { Ng2ImgToolsModule } from 'ng2-img-tools';
import { FirebaseModule } from './modules/firebase.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { ThumbService } from './services/thumb.service';
import { LoginPartialComponent } from './partials/login/login.partial.component';
import { LoginComponent } from './routes/login/login.component';
import { HomeComponent } from './routes/home/home.component';
import { HeaderPartialComponent } from './partials/header/header.partial.component';
import { ResponsiveAdComponent } from './partials/responsive-ad/responsive-ad.component';
import { ThumbnailComponent } from './partials/thumbnail/thumbnail.component';
import 'rxjs/Rx';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginPartialComponent,
    HomeComponent,
    HeaderPartialComponent,
    ResponsiveAdComponent,
    ThumbnailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    FirebaseModule,
    MomentModule,
    Ng2ImgToolsModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
    ThumbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
