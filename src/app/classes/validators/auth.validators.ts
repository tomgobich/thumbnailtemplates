import { AbstractControl } from '@angular/forms'
import { regex } from '../../../environments/environment'

export class AuthValidators {

    /**
     * Requires a password to have at least
     *      1 lowercase character
     *      1 uppercase character
     *      1 number
     *      6 character minimum
     *
     * @static
     * @param {AbstractControl} control
     * @returns
     *
     * @memberof AuthValidators
     */
    static password(control: AbstractControl) {
        const valid = regex.mediumPassword.test(control.value)
        return valid ? null : { invalidPassword: true }
    }

    /**
     * Confirms password and passwordConfirm are identical
     *
     * @static
     * @param {AbstractControl} confirm
     * @returns
     *
     * @memberof AuthValidators
     */
    static passwordMatch(confirm: AbstractControl) {
        if(confirm.parent) {
            let password = confirm.parent.get('password')
            return password.value == confirm.value ? null : { invalidPasswordMatch: true }
        }

        return { invalidPasswordMatch: true }
    }

    /**
     * Requires youtube url to start with http://youtube.com/
     * and prevents dangerous characters from being submitted
     *
     * @static
     * @param {AbstractControl} control
     * @returns
     *
     * @memberof AuthValidators
     */
    static youtubeUrlPattern(control: AbstractControl) {
        let isCorrectDomain = control.value.startsWith('http://youtube.com/')
        let hasValidChars = !/[<>"']/g.test(control.value)
        return isCorrectDomain && hasValidChars ? null : { invalidUrl: true }
    }

    /**
     * Requires twitter url to start with http://twitter.com/
     * and prevents dangerous characters from being submitted
     *
     * @static
     * @param {AbstractControl} control
     * @returns
     *
     * @memberof AuthValidators
     */
    static twitterUrlPattern(control: AbstractControl) {
        let isCorrectDomain = control.value.startsWith('http://twitter.com/')
        let hasValidChars = !/[<>"']/g.test(control.value)
        return isCorrectDomain && hasValidChars ? null : { invalidUrl: true }
    }

    /**
     * Requires facebook url to start with http://facebook.com/
     * and prevents dangerous characters from being submitted
     *
     * @static
     * @param {AbstractControl} control
     * @returns
     *
     * @memberof AuthValidators
     */
    static facebookUrlPattern(control: AbstractControl) {
        let isCorrectDomain = control.value.startsWith('http://facebook.com/')
        let hasValidChars = !/[<>"']/g.test(control.value)
        return isCorrectDomain && hasValidChars ? null : { invalidUrl: true }
    }

}