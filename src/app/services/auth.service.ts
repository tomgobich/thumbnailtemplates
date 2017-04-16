import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Router, NavigationStart } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { md5 } from './md5.service';
import 'rxjs/add/operator/toPromise';

import { User } from '../models/user.model';

@Injectable()
export class AuthService {

  apiUrl = 'http://localhost:3000'
  UID: string = null
  user = null
  avatar = null
  isAuthenticated = false

  constructor(private af: AngularFire, private http: Http) {
    af.auth.subscribe(user => {
      if (user) {
        this.UID = user.uid
        this.user = user
        this.avatar = this.getAvatar(user.auth.email, 50)
        this.isAuthenticated = true
      }
      else {
        this.UID = null
        this.user = null
        this.isAuthenticated = false
      }
    })
  }

  // Log user into app
  login(email, password) {
    this.af.auth
      .login({ email, password })
      .then(user => {
        this.UID = user.uid
      })
  }

  // Sign up user
  signup(username, email, password) {
    this.af.auth
      .createUser({ email, password })
      .then(user => {
        let newUser = this.createUser(username, user.auth)
        this.http.post(`${this.apiUrl}/user/create`, newUser).toPromise()
          .then(response => {
            console.log({response})
          })
        console.log({user})
      })
  }

  // Logs user out of app session
  logout() {
    this.af.auth.logout().then(() => {
      this.UID = null;
      console.warn('User has logged out');
    })
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

  createUser(username, credentials) {
    this.UID = credentials.uid

    let user = new User
    user.strUsername = username
    user.strUserID = credentials.uid
    user.strEmail  = credentials.email
    user.blnEmailVerified = credentials.emailVerified
    console.log({createUser: user})
    return user
  }

}
