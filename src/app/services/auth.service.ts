import { Injectable, ApplicationRef } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment'
import { AngularFireAuth } from 'angularfire2/auth'
import { Router, NavigationStart } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { md5 } from './md5.service';
import { ApiAuthService } from './api/api-auth.service'
import { ValidateService } from './validate.service'
import { UtilitiesService } from './utilities.service'
import 'rxjs/add/operator/toPromise';

import { User } from '../models/user.model';

@Injectable()
export class AuthService {

  // TODO: Move service calls from inside doc models into component logic

  apiUrl: string = environment.apiUrl
  UID: string = null
  user = null
  username = null
  avatar = null
  isAuthenticated = false
  loginError = null
  signupError = null
  signupSuccess = null

  constructor(
     private afAuth: AngularFireAuth
    ,private http: Http
    ,private router: Router
    ,private apiAuthService: ApiAuthService
    ,private validateService: ValidateService
    ,private utilitiesService: UtilitiesService
    ,private ar: ApplicationRef
  ) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.UID = user.uid
        this.user = user
        this.avatar = this.getAvatar(user.email, 50)
        this.isAuthenticated = true
        setTimeout(() => this.getUsername(user.uid), 2500)
      }
      else {
        this.initializeAllVariables()
      }
    })
  }

  // Log user into app
  login(email, password) {
    let isValid = this.validateService.validateLogin(email, password)

    if(isValid) {
      this.apiAuthService.loginUser(email, password).then(response => {
        this.UID = response.data.uid
        this.loginError = response.hasError ? response.message : ''
        if (!response.hasError) this.router.navigate(['/'])
      })
    }
  }

  // Sign up user
  signup(username, email, password, passwordConfirm, youtube, twitter, facebook, bio) {
    let isValid = this.validateService.validateSignup(username, email, password, passwordConfirm, youtube, twitter, facebook, bio)

    if(isValid) {
      this.apiAuthService.signupUser(username, email, password, passwordConfirm, youtube, twitter, facebook, bio)
        .then(response => {
          // FIXME: Need change detection
          this.UID = response.data.user.uid
          this.signupSuccess = response.data.message
          this.signupError = response.hasError ? response.message : ''
          if (!response.hasError) this.router.navigate['/']
        })
    }
  }

  // Logs user out of app session
  logout() {
    this.apiAuthService.logoutUser();
    this.initializeAllVariables();
    this.router.navigate(['/login'])
  }

  // Returns current user's ID
  getID(): string {
    return this.isAuthenticated ? this.UID : '';
  }

  getAvatar(email: string, size: number): string {
    size = size > 0 ? size : 30;
    let hash = md5(email.toLowerCase().trim());
    return `https://gravatar.com/avatar/${hash}?s=${size}&d=retro&r=r`;
  }

  async getUsername(uid) {
    try {
      const response = await this.http.get(`${this.apiUrl}/getusername/id/${uid}`).toPromise()
      this.username = response.json().username
    }
    catch(e) {
      console.error(e)
    }
  }

  async getUserByUserID(strUserID: string) {
    try {
      let uid = this.utilitiesService.escapeHtml(strUserID)
      const response = await this.http.get(`${this.apiUrl}/getuser/id/${uid}`).toPromise()
      return await response.json()
    }
    catch(e) {
      console.error(e)
    }
  }

  async getUserByUsername(strUsername: string) {
    try {
      let username = this.utilitiesService.escapeHtml(strUsername)
      const response = await this.http.get(`${this.apiUrl}/getuser/username/${username}`).toPromise()
      return await response.json()
    }
    catch(e) {
      console.error(e)
    }
  }

  buildUser(data) {
    let user = new User

    user.strUserID        = data.strUserID
    user.strEmail         = data.strEmail
    user.blnEmailVerified = data.blnEmailVerified
    user.strUsername      = data.strUsername
    user.strAvatar        = data.strAvatar
    user.strYouTube       = data.strYouTube
    user.strTwitter       = data.strTwitter
    user.strFacebook      = data.strFacebook
    user.strBio           = data.strBio
    user.intStatusID      = data.intStatusID

    return user
  }

  initializeAllVariables() {
    this.ar.tick()
    this.UID = null
    this.user = null
    this.username = null
    this.avatar = null
    this.isAuthenticated = false
    this.loginError = null
    this.signupError = null
    this.signupSuccess = null
  }

}
