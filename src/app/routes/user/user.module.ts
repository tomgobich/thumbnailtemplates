import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms';

import { SignupComponent } from './signup/signup.component'
import { LoginComponent } from './login/login.component';

import { EmailComponent } from './partials/form-inputs/email.component';
import { PasswordComponent } from './partials/form-inputs/password.component';
import { PasswordConfirmComponent } from './partials/form-inputs/password-confirm.component'
import { UsernameComponent } from './partials/form-inputs/username.component'
import { YouTubeComponent } from './partials/form-inputs/youtube.component'
import { TwitterComponent } from './partials/form-inputs/twitter.component'
import { FacebookComponent } from './partials/form-inputs/facebook.component'
import { BioComponent } from './partials/form-inputs/bio.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    EmailComponent,
    PasswordComponent,
    PasswordConfirmComponent,
    UsernameComponent,
    YouTubeComponent,
    TwitterComponent,
    FacebookComponent,
    BioComponent
  ]
})
export class UserModule { }
