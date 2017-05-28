import { Injectable, ApplicationRef } from '@angular/core';
import { environment } from '../../environments/environment'
import { AngularFireAuth } from 'angularfire2/auth'
import { Router, NavigationStart } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { md5 } from './md5.service';
import { ApiAuthService } from './api/api-auth.service'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

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
    ,private router: Router
    ,private apiAuthService: ApiAuthService
    ,private ar: ApplicationRef
  ) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.UID = user.uid
        this.user = user
        this.avatar = this.getAvatar(user.email, 50)
        this.isAuthenticated = true
        setTimeout(() => this.getUsernameByUid(user.uid), 2500)
      }
      else {
        this.initializeAllVariables()
      }
    })
  }

  /**
   * Processes user login form submission
   *
   * @param {any} login
   *
   * @memberof AuthService
   */
  login(login) {
    this.apiAuthService
    .loginUser(login.email, login.password)
    .then(response => {
      this.UID = response.data.uid
      this.loginError = response.hasError ? response.message : ''
      if (!response.hasError) this.router.navigate(['/'])
    })
  }

  /**
   * Processes user signup form submission
   *
   * @param {any} signup
   *
   * @memberof AuthService
   */
  signup(signup) {
    this.apiAuthService
    .signupUser(signup)
    .then(response => {
      this.UID = response.data.user.uid
      this.signupSuccess = response.data.message
      this.signupError = response.hasError ? response.message : ''
      if (!response.hasError) this.router.navigate(['/'])
    })
  }

  /**
   * Logs user out of session
   *
   *
   * @memberof AuthService
   */
  logout() {
    this.apiAuthService.logoutUser();
    this.initializeAllVariables();
    this.router.navigate(['/login'])
  }

  /**
   * Returns currently logged in user's UID
   *
   * @returns {string}
   *
   * @memberof AuthService
   */
  getID(): string {
    return this.isAuthenticated ? this.UID : '';
  }

  /**
   * Gets user's avatar from Gravatar by email
   *
   * @param {string} email
   * @param {number} size
   * @returns {string}
   *
   * @memberof AuthService
   */
  getAvatar(email: string, size: number): string {
    size = size > 0 ? size : 30;
    let hash = md5(email.toLowerCase().trim());
    return `https://gravatar.com/avatar/${hash}?s=${size}&d=retro&r=r`;
  }

  /**
   * Gets a user's username by UID
   *
   * @param {any} uid
   *
   * @memberof AuthService
   */
  getUsernameByUid(uid) {
    this.apiAuthService
    .getUsernameByUid(uid)
    .then(response => {
      this.username = response
    })
  }

  /**
   * Gets a user's details by UserID
   *
   * @param {string} strUserID
   * @returns
   *
   * @memberof AuthService
   */
  getUserByUserID(strUserID: string) {
    return this.apiAuthService.getUserByUserID(strUserID)
  }

  /**
   * Gets a user's details by username
   *
   * @param {string} strUsername
   * @returns
   *
   * @memberof AuthService
   */
  getUserByUsername(strUsername: string) {
    return this.apiAuthService.getUserByUsername(strUsername)
  }

  /**
   * Resets all user assessible variables
   *
   *
   * @memberof AuthService
   */
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
