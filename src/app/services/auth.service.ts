import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Router, NavigationStart } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { md5 } from './md5.service';
import { UtilitiesService } from './utilities.service'
import 'rxjs/add/operator/toPromise';

import { User } from '../models/user.model';

@Injectable()
export class AuthService {

  // TODO: Move service calls from inside doc models into component logic

  apiUrl = 'http://localhost:3000'
  UID: string = null
  user = null
  username = null
  avatar = null
  isAuthenticated = false
  loginError = null
  signupError = null
  signupSuccess = null

  errorUsername         = { valid: false, message: "" }
  errorEmail            = { valid: false, message: "" }
  errorPassword         = { valid: false, message: "" }
  errorPasswordConfirm  = { valid: false, message: "" }
  errorYouTube          = { valid: true, message: "" }
  errorTwitter          = { valid: true, message: "" }
  errorFacebook         = { valid: true, message: "" }
  errorBio              = { valid: true, message: "" }

  constructor(
    private af: AngularFire,
    private http: Http,
    private router: Router,
    private utilitiesService: UtilitiesService
  ) {
    af.auth.subscribe(user => {
      if (user) {
        this.UID = user.uid
        this.user = user
        this.avatar = this.getAvatar(user.auth.email, 50)
        this.isAuthenticated = true
        setTimeout(() => this.getUsername(user.uid), 2500)
      }
      else {
        this.UID = null
        this.user = null
        this.isAuthenticated = false
      }
    })
  }

  // Log user into app
  async login(email, password) {
    let isValid = this.validateLogin(email, password)

    if(isValid) {
      try {
        const response = await this.af.auth.login({ email, password })
        this.UID = response.uid
        this.router.navigate['/']
      }
      catch(e) {
        this.loginError = e
        console.error(e)
      }
    }
  }

  // Sign up user
  async signup(username, email, password, passwordConfirm, youtube, twitter, facebook, bio) {
    let isValid = this.validateSignup(username, email, password, passwordConfirm, youtube, twitter, facebook, bio)

    if(isValid) {
      try {
        const response = await this.af.auth.createUser({ email, password })
        const newUser = await this.createUser(username, youtube, twitter, facebook, bio, response.auth)
        const userResponse = await this.http.post(`${this.apiUrl}/user/create`, newUser).toPromise()
        this.signupSuccess = await userResponse.json()
        this.router.navigate['/']
      }
      catch(e) {
        this.signupError = e
      }
    }
  }

  // Logs user out of app session
  async logout() {
    const response = await this.af.auth.logout()
    this.initializeAllVariables();
    await this.router.navigate(['/login'])
    await console.warn('User has logged out')
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

  createUser(username, youtube, twitter, facebook, bio, credentials) {
    this.UID = credentials.uid

    let user = new User
    user.strUserID        = credentials.uid                    // valid since from Google
    user.strEmail         = credentials.email                  // valid since from Google
    user.blnEmailVerified = credentials.emailVerified          // valid since from Google
    user.strUsername      = this.utilitiesService.escapeHtml(this.utilitiesService.replaceNullOrUndefined(username.trim()))
    user.strYouTube       = this.utilitiesService.escapeHtml(this.utilitiesService.replaceNullOrUndefined(youtube.trim()))
    user.strTwitter       = this.utilitiesService.escapeHtml(this.utilitiesService.replaceNullOrUndefined(twitter.trim()))
    user.strFacebook      = this.utilitiesService.escapeHtml(this.utilitiesService.replaceNullOrUndefined(facebook.trim()))
    user.strBio           = this.utilitiesService.escapeHtml(this.utilitiesService.replaceNullOrUndefined(bio))

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

    this.validateEmail(email)
    this.validatePassword(password)

    fields.forEach(field => !field.valid ? isValid = false : "")
    return isValid
  }

  validateSignup(username, email, password, passwordConfirm, youtube, twitter, facebook, bio) {
    let isValid = true
    let fields = [this.errorUsername, this.errorEmail, this.errorPassword, this.errorPasswordConfirm, this.errorYouTube, this.errorTwitter, this.errorFacebook, this.errorBio]

    this.validateUsername(username)
    this.validateEmail(email)
    this.validatePassword(password)
    this.validatePasswordConfirm(password, passwordConfirm)
    this.validateYouTube(this.utilitiesService.replaceNullOrUndefined(youtube))
    this.validateTwitter(this.utilitiesService.replaceNullOrUndefined(twitter))
    this.validateFacebook(this.utilitiesService.replaceNullOrUndefined(facebook))
    this.validateBio(this.utilitiesService.replaceNullOrUndefined(bio))

    fields.forEach(field => !field.valid ? isValid = false : "")

    return isValid
  }

  validateUsername(text) {
    let isValid = this.validateRequired("Username", text, 3, 50);

    isValid = isValid.valid ? this.utilitiesService.hasSpecialChars(text) : isValid
    isValid = isValid.valid ? this.utilitiesService.hasSpaces(text) : isValid

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
      let regex = this.utilitiesService.regexEmail
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
    this.errorTwitter = this.utilitiesService.hasSpecialChars(text)
  }

  validateYouTube(text) {
    this.errorYouTube = this.utilitiesService.hasSpecialChars(text)
  }

  validateFacebook(text) {
    this.errorFacebook = this.utilitiesService.hasSpecialChars(text)
  }

  validateBio(text) {
    let isValid = text.length <= 500

    if(isValid) {
      this.errorBio = this.utilitiesService.hasSpecialChars(text);
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

  initializeAllVariables() {
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
