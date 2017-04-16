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

  // TODO: Add validation for signup / login inputs

  errorUsername = null
  errorEmail = null
  errorPassword = null
  errorPasswordConfirm = null
  errorYouTube = null
  errorTwitter = null
  errorFacebook = null
  errorBio = null

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
  signup(username, email, password, passwordConfirm, youtube, twitter, facebook, bio) {
    this.af.auth
      .createUser({ email, password })
      .then(user => {
        let newUser = this.createUser(username, youtube, twitter, facebook, bio, user.auth)
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

  createUser(username, youtube, twitter, facebook, bio, credentials) {
    this.UID = credentials.uid

    let user = new User
    user.strUserID        = credentials.uid                    // valid since from Google
    user.strEmail         = credentials.email                  // valid since from Google
    user.blnEmailVerified = credentials.emailVerified          // valid since from Google
    user.strUsername      = this.escapeHtml(username)
    user.strYouTube       = this.escapeHtml(youtube)
    user.strTwitter       = this.escapeHtml(twitter)
    user.strFacebook      = this.escapeHtml(facebook)
    user.strBio           = this.escapeHtml(bio)
    return user
  }

  validateUsername(text) {
    let isValid = this.validateRequired("Username", text, 3, 50);
    if(isValid.valid) {
      this.http.post(`${this.apiUrl}/user/username/unique`, {username: text}).toPromise()
        .then(response => {
          let unique = response.json().unique
          this.errorUsername = {
            valid: unique,
            message: "Username is already taken, please try another"
          }
        })
    }
    else {
      this.errorUsername = isValid
    }
  }

  validateEmail(text) {
    let isValid = this.validateRequired("Email", text, 3, 50);
    if(isValid.valid) {
      let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      this.errorEmail = {
        valid: regex.test(text),
        message: "Please enter a valid email"
      }
    }
    else {
      this.errorEmail = isValid
    }
  }

  validatePassword(text) {

  }

  validatePasswordConfirm(password, confirmation) {
    this.errorPasswordConfirm = {
      valid: password == confirmation,
      message: "Passwords do not match, please try again"
    }
  }

  validateRequired(field, text, minLength, maxLength) {
    return {
      valid: text.length >= minLength ? true : false,
      message: `${field} be between ${minLength} and ${maxLength} characters long`
    }
  }

  escapeHtml(text) {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
  }

}
