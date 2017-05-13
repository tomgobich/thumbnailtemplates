import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { AngularFire } from 'angularfire2'
import { environment } from '../../../environments/environment'
import { UtilitiesService } from '../utilities.service'

@Injectable()
export class ApiAuthService {

  apiUrl = environment.apiUrl

  constructor(
     private http: Http
    ,private af: AngularFire
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
      const response = await this.af.auth.login({ email, password })
      return this.utilitiesService.buildResponseObject(response, false, undefined)
    }
    catch(e) {
      return this.utilitiesService.buildResponseObject(undefined, true, e)
    }
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
      const response      = await this.af.auth.createUser({ email, password })
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
   * Returns whether a username is unique
   * 
   * @param {string} text 
   * @returns 
   * 
   * @memberof ApiAuthService
   */
  async isUsernameUnique(text: string) {
    const response = await this.http.post(`${this.apiUrl}/user/username/unique`, {username: text}).toPromise()
    return response.json().unique
  }

}
