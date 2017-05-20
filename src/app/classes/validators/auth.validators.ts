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

    static passwordMatch(confirm: AbstractControl) {
        if(confirm.parent) {
            let password = confirm.parent.get('password')
            return password.value == confirm.value ? null : { invalidPasswordMatch: true }
        }

        return { invalidPasswordMatch: true }
    }

}