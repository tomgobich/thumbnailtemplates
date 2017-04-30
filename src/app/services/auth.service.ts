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
  loginError = null
  signupError = null
  signupSuccess = null

  // TODO: Add validation for signup / login inputs

  errorUsername         = { valid: false, message: "" }
  errorEmail            = { valid: false, message: "" }
  errorPassword         = { valid: false, message: "" }
  errorPasswordConfirm  = { valid: false, message: "" }
  errorYouTube          = { valid: true, message: "" }
  errorTwitter          = { valid: true, message: "" }
  errorFacebook         = { valid: true, message: "" }
  errorBio              = { valid: true, message: "" }

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
    let isValid = this.validateLogin(email, password)

    if(isValid) {
      this.af.auth
        .login({ email, password })
        .then(user => {
          this.UID = user.uid
          console.log('user is now logged in with uid ', user.uid)
        })
        .catch(error => {
          this.loginError = error
          console.error(error)
      })
    }
  }

  // Sign up user
  signup(username, email, password, passwordConfirm, youtube, twitter, facebook, bio) {
    console.log(username)

    let isValid = this.validateSignup(username, email, password, passwordConfirm, youtube, twitter, facebook, bio)

    if(isValid) {
      this.af.auth
        .createUser({ email, password })
        .then(user => {
          let newUser = this.createUser(username, youtube, twitter, facebook, bio, user.auth)
          this.http.post(`${this.apiUrl}/user/create`, newUser).toPromise()
            .then(response => {
              this.signupSuccess = response.json()
              console.log(response.json())
            })
        })
        .catch(error => {
          this.signupError = error
          console.error(error)
        })
    }
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
    user.strUsername      = encodeURIComponent(this.replaceNullOrUndefined(username.trim()))
    user.strYouTube       = encodeURIComponent(this.replaceNullOrUndefined(youtube.trim()))
    user.strTwitter       = encodeURIComponent(this.replaceNullOrUndefined(twitter.trim()))
    user.strFacebook      = encodeURIComponent(this.replaceNullOrUndefined(facebook.trim()))
    user.strBio           = encodeURIComponent(this.replaceNullOrUndefined(bio))

    return user
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

  validateLogin(email, password) {
    let isValid = true
    let fields = [this.errorEmail, this.errorPassword]

    this.validateEmail(this.replaceNullOrUndefined(email))
    this.validatePassword(this.replaceNullOrUndefined(password))

    fields.forEach(field => !field.valid ? isValid = false : "")
    return isValid
  }

  validateSignup(username, email, password, passwordConfirm, youtube, twitter, facebook, bio) {
    let isValid = true
    let fields = [this.errorUsername, this.errorEmail, this.errorPassword, this.errorPasswordConfirm, this.errorYouTube, this.errorTwitter, this.errorFacebook, this.errorBio]

    this.validateUsername(this.replaceNullOrUndefined(username))
    this.validateEmail(this.replaceNullOrUndefined(email))
    this.validatePassword(this.replaceNullOrUndefined(password))
    this.validatePasswordConfirm(this.replaceNullOrUndefined(password), this.replaceNullOrUndefined(passwordConfirm))
    this.validateYouTube(this.replaceNullOrUndefined(youtube))
    this.validateTwitter(this.replaceNullOrUndefined(twitter))
    this.validateFacebook(this.replaceNullOrUndefined(facebook))
    this.validateBio(this.replaceNullOrUndefined(bio))

    fields.forEach(field => !field.valid ? isValid = false : "")
    return isValid
  }

  validateUsername(text) {
    let isValid = this.validateRequired("Username", text, 3, 50);

    isValid = isValid.valid ? this.hasSpecialChars(text) : isValid
    isValid = isValid.valid ? this.hasSpaces(text) : isValid

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
    this.errorPassword = this.validateRequired("Password", text, 6, 50)
  }

  validatePasswordConfirm(password, confirmation) {
    this.errorPasswordConfirm = {
      valid: password == confirmation,
      message: "Passwords do not match, please try again"
    }
  }

  validateTwitter(text) {
    this.errorTwitter = this.hasSpecialChars(text)
  }

  validateYouTube(text) {
    this.errorYouTube = this.hasSpecialChars(text)
  }

  validateFacebook(text) {
    this.errorFacebook = this.hasSpecialChars(text)
  }

  validateBio(text) {
    let isValid = text.length <= 500

    if(isValid) {
      this.errorBio = this.hasSpecialChars(text);
    }
    else {
      this.errorBio = {
        valid: isValid,
        message: `Bio cannot exceed 500 characters, you need to lose ${500 - text.length} characters.`
      }
    }
  }

  validateRequired(field, text, minLength, maxLength) {
    let isValid = text.trim().length >= minLength ? true : false

    return {
      valid: isValid,
      message: `${field} must be between ${minLength} and ${maxLength} characters long`
    }
  }

  hasSpecialChars(text) {
    let compare = this.escapeHtml(text)
    let isValid = text == compare

    return {
      valid: isValid,
      message: "Please remove invalid characters (&, <, >, \", ')"
    }
  }

  hasSpaces(text) {
    let isValid = !/\s/.test(text.trim())

    return {
      valid: isValid,
      message: "Please remove all spaces"
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

  replaceNullOrUndefined(text) {
    return text == null || text == undefined ? '' : text
  }

}
