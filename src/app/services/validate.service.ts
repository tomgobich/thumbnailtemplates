import { Injectable } from '@angular/core';
import { ApiAuthService } from './api/api-auth.service'
import { UtilitiesService } from './utilities.service'
import { FormGroup, AbstractControl } from '@angular/forms'

import 'rxjs/add/operator/map'

@Injectable()
export class ValidateService {

  errorUsername         = { valid: false, message: "" }
  errorEmail            = { valid: false, message: "" }
  errorPassword         = { valid: false, message: "" }
  errorPasswordConfirm  = { valid: false, message: "" }
  errorYouTube          = { valid: true, message: "" }
  errorTwitter          = { valid: true, message: "" }
  errorFacebook         = { valid: true, message: "" }
  errorBio              = { valid: true, message: "" }

  constructor(
     private apiAuthService: ApiAuthService
    ,private utilitiesService: UtilitiesService
  ) { }


  /**
   * Validates full user login
   *
   * @param {any} email
   * @param {any} password
   * @returns
   *
   * @memberof ValidateService
   */
  validateLogin(email, password) {
    let isValid = true
    let fields = [this.errorEmail, this.errorPassword]

    this.validateEmail(email)
    this.validatePassword(password)

    fields.forEach(field => !field.valid ? isValid = false : "")
    return isValid
  }

  /**
   * Validates full user signup
   *
   * @param {any} username
   * @param {any} email
   * @param {any} password
   * @param {any} passwordConfirm
   * @param {any} youtube
   * @param {any} twitter
   * @param {any} facebook
   * @param {any} bio
   * @returns
   *
   * @memberof ValidateService
   */
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

  /**
   * Validates username
   *
   * @param {string} text
   *
   * @memberof ValidateService
   */
  validateUsername(text: string) {
    // let isValid = this.validateRequired("Username", text, 3, 50);

    // isValid = isValid.valid ? this.utilitiesService.hasSpecialChars(text) : isValid
    // isValid = isValid.valid ? this.utilitiesService.hasSpaces(text) : isValid

    // if (isValid.valid) {
    //   this.apiAuthService.isUsernameUnique(text).then(isValidResponse => {
    //     this.errorUsername = {
    //       valid: isValidResponse,
    //       message: "Username is already taken, please try another"
    //     }
    //   })
    // }
    // else {
    //   this.errorUsername = isValid
    // }
  }

  /**
   * Validates email
   *
   * @param {any} text
   *
   * @memberof ValidateService
   */
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

  /**
   * Validates password
   *
   * @param {any} text
   *
   * @memberof ValidateService
   */
  validatePassword(text) {
    this.errorPassword = this.validateRequired("Password", text, 6, 50)
  }

  /**
   * Validates password confirm / password match
   *
   * @param {any} password
   * @param {any} confirmation
   *
   * @memberof ValidateService
   */
  validatePasswordConfirm(password, confirmation) {
    this.errorPasswordConfirm = {
      valid: password == confirmation,
      message: "Passwords do not match, please try again"
    }
  }

  /**
   * Validates twitter (optional)
   *
   * @param {any} text
   *
   * @memberof ValidateService
   */
  validateTwitter(text) {
    this.errorTwitter = this.utilitiesService.hasSpecialChars(text)
  }

  /**
   * Validates youtube (optional)
   *
   * @param {any} text
   *
   * @memberof ValidateService
   */
  validateYouTube(text) {
    this.errorYouTube = this.utilitiesService.hasSpecialChars(text)
  }

  /**
   * Validates facebook (optional)
   *
   * @param {any} text
   *
   * @memberof ValidateService
   */
  validateFacebook(text) {
    this.errorFacebook = this.utilitiesService.hasSpecialChars(text)
  }

  /**
   * Validates bio (optional)
   *
   * @param {any} text
   *
   * @memberof ValidateService
   */
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

  /**
   * Validates a required fields bounds
   *
   * @param {any} field
   * @param {any} text
   * @param {any} minLength
   * @param {any} maxLength
   * @returns
   *
   * @memberof ValidateService
   */
  validateRequired(field, text, minLength, maxLength) {
    let isValid = text.trim().length >= minLength ? true : false

    return {
      valid: isValid,
      message: `${field} must be between ${minLength} and ${maxLength} characters long`
    }
  }

  /**
   * Returns required validity state
   *
   * @param {string} name
   * @returns
   *
   * @memberof LoginAuthFormComponent
   */
  required(parent: FormGroup, name: string) {
    return (
      parent.get(name).hasError('required') &&
      parent.get(name).touched
    )
  }

  /**
   * Returns min length validity state
   *
   * @param {FormGroup} parent
   * @param {string} name
   * @returns
   *
   * @memberof ValidateService
   */
  minLength(parent: FormGroup, name: string) {
    return (
      parent.get(name).hasError('minLength') &&
      parent.get(name).dirty
    )
  }

  /**
   * Returns max length validity state
   *
   * @param {FormGroup} parent
   * @param {string} name
   * @returns
   *
   * @memberof ValidateService
   */
  maxLength(parent: FormGroup, name: string) {
    return (
      parent.get(name).hasError('maxLength') &&
      parent.get(name).dirty
    )
  }

  pattern(parent: FormGroup, name: string) {
    return (
      parent.get(name).hasError('pattern') &&
      parent.get(name).dirty &&
      !this.minLength(parent, name) &&
      !this.maxLength(parent, name)
    )
  }

  url(parent: FormGroup, name: string) {
    return (
      parent.get(name).hasError('invalidUrl') &&
      parent.get(name).dirty &&
      parent.get(name).value !== '' &&
      !this.minLength(parent, name) &&
      !this.maxLength(parent, name)
    )
  }

}
