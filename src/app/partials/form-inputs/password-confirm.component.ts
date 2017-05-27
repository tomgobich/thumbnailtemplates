import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { ValidateService } from '../../services/validate.service'

@Component({
  selector: 'app-password-confirm',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div [formGroup]="parent" class="form-group">
        <input
            #passwordConfirm
            type="password"
            class="form-control"
            [tabIndex]="tabIndex"
            formControlName="passwordConfirm">
        <label
            class="inline-label"
            [class.active]="parent.get('passwordConfirm').value">
            Confirm your password
            <span class="faded" *ngIf="optional">
                - Optional
            </span>
        </label>
        <div
            class="invalid"
            *ngIf="validateService.required(parent, 'passwordConfirm')">
            <i class="zmdi zmdi-alert-circle"></i>
            Please confirm your passwords match!
        </div>
        <div
            class="invalid"
            *ngIf="invalidPasswordMatch">
            <i class="zmdi zmdi-alert-circle"></i>
            Sorry, passwords don't match, please try again!
        </div>
    </div>
  `
})
export class PasswordConfirmComponent {

  @Input() parent: FormGroup
  @Input() optional: boolean = false
  @Input() tabIndex: number

  constructor(
    private validateService: ValidateService
  ) { }

  get invalidPasswordMatch() {
    return (
      this.parent.get('passwordConfirm').hasError('invalidPasswordMatch') &&
      this.parent.get('passwordConfirm').dirty &&
      !this.validateService.required(this.parent, 'passwordConfirm')
    )
  }

}
