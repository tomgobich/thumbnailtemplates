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
  async signupUser(username:string, email:string, password:string, passwordConfirm?:string, youtube?:string, twitter?:string, facebook?:string, bio?:string) {
    try {
      const response      = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      const newUser       = await this.utilitiesService.createUser(username, youtube, twitter, facebook, bio, response.auth)
      const userResponse  = await this.http.post(`${this.apiUrl}/user/create`, newUser).toPromise()
      const user          = await userResponse.json().data
      const message       = await userResponse.json().message

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
    const response = await this.http.post(`${this.apiUrl}/user/username/unique`, { username }).toPromise()
    return response.json().unique
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
    const response = await this.http.post(`${this.apiUrl}/user/email/unique`, { email }).toPromise()
    return response.json().unique
  }

}
