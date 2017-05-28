import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { AngularFireAuth } from 'angularfire2/auth'
import { environment } from '../../../environments/environment'
import { UtilitiesService } from '../utilities.service'

@Injectable()
export class ApiAuthService {

  apiUrl = environment.apiUrl

  constructor(
     private http: Http
    ,private afAuth: AngularFireAuth
    ,private utilitiesService: UtilitiesService
  ) { }

  /**
   * Log a user into site
   *
   * @param {string} email
   * @param {string} password
   * @returns
   *
   * @memberof ApiAuthService
   */
  async loginUser(email: string, password: string) {
    try {
      const response = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
      return this.utilitiesService.buildResponseObject(response, false, undefined)
    }
    catch(e) {
      return this.utilitiesService.buildResponseObject(undefined, true, e)
    }
  }

  async logoutUser() {
    await this.afAuth.auth.signOut()
  }

  /**
   * Creates user account record in database
   *
   * @param {string} username
   * @param {string} email
   * @param {string} password
   * @param {string} [passwordConfirm]
   * @param {string} [youtube]
   * @param {string} [twitter]
   * @param {string} [facebook]
   * @param {string} [bio]
   * @returns
   *
   * @memberof ApiAuthService
   */
  async signupUser(signup) {
    try {
      const response          = await this.afAuth.auth.createUserWithEmailAndPassword(signup.email, signup.password)
      signup.uid              = await response.uid
      signup.email            = await response.email
      signup.emailVerified    = await response.emailVerified
      const newUser           = await this.utilitiesService.createUser(signup)
      const userResponse      = await this.http.post(`${this.apiUrl}/user/create`, newUser).toPromise()
      const user              = await userResponse.json().data
      const message           = await userResponse.json().message

      return await this.utilitiesService.buildResponseObject({user, message}, false, undefined)
    }
    catch(e) {
      return this.utilitiesService.buildResponseObject(undefined, true, e)
    }
  }


  /**
   * Returns whether a username is already used on an account
   *
   * @param {string} text
   * @returns
   *
   * @memberof ApiAuthService
   */
  async isUsernameUnique(username: string) {
    if (username) {
      const response = await this.http.post(`${this.apiUrl}/user/username/unique`, { username }).toPromise()
      return response.json().unique
    }

    return false
  }

  /**
   * Returns whether an email address is already used on an account
   *
   * @param {string} email
   * @returns
   *
   * @memberof ApiAuthService
   */
  async isEmailUnique(email: string) {
    if (email) {
      const response = await this.http.post(`${this.apiUrl}/user/email/unique`, { email }).toPromise()
      return response.json().unique
    }

    return false
  }

  /**
   * Gets a user's username by their UID
   *
   * @param {string} uid
   * @returns
   *
   * @memberof ApiAuthService
   */
  async getUsernameByUid(uid: string) {
    try {
      const response = await this.http.get(`${this.apiUrl}/getusername/id/${uid}`).toPromise()
      return response.json().username
    }
    catch(e) {
      console.error(e)
    }
  }

  /**
   * Gets a user's details by their UserID
   *
   * @param {string} strUserID
   * @returns
   *
   * @memberof ApiAuthService
   */
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

  /**
   * Gets a user's details by their username
   *
   * @param {string} strUsername
   * @returns
   *
   * @memberof ApiAuthService
   */
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

}
