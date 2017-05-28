import { Injectable } from '@angular/core';
import { User } from '../models/user.model'

@Injectable()
export class UtilitiesService {

  regexEmail: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

  constructor() { }

  buildResponseObject(res?: any, err?: boolean, msg?: string) {
    const data      = res ? res : ''
    const hasError  = err ? err : false
    const message   = msg ? msg : ''

    return { data, hasError, message }
  }

  createUser(username, youtube, twitter, facebook, bio, credentials) {
    let user = new User

    user.strUserID        = credentials.uid                    // valid since from Google
    user.strEmail         = credentials.email                  // valid since from Google
    user.blnEmailVerified = credentials.emailVerified          // valid since from Google
    user.strUsername      = this.escapeHtml(this.replaceNullOrUndefined(username.trim()))
    user.strYouTube       = this.escapeHtml(this.replaceNullOrUndefined(youtube.trim()))
    user.strTwitter       = this.escapeHtml(this.replaceNullOrUndefined(twitter.trim()))
    user.strFacebook      = this.escapeHtml(this.replaceNullOrUndefined(facebook.trim()))
    user.strBio           = this.escapeHtml(this.replaceNullOrUndefined(bio))

    console.log({ user })

    return user
  }

  // Validation check for special characters
  hasSpecialChars(text) {
    let compare = this.escapeHtml(text)
    let isValid = text == compare

    return {
      valid: isValid,
      message: "Please remove invalid characters (&, <, >, \", ')"
    }
  }

  // Validation check for spaces
  hasSpaces(text) {
    let isValid = !/\s/.test(text.trim())

    return {
      valid: isValid,
      message: "Please remove all spaces"
    }
  }

  // Escape any malicious content
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

  // Prevent thrown errors by replacing null or undefined with empty string
  replaceNullOrUndefined(text) {
    return text == null || text == undefined ? '' : text
  }

}
