import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { ValidateService } from '../../services/validate.service'

@Component({
  selector: 'app-password',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div [formGroup]="parent" class="form-group">
        <input
            #password
            type="password"
            class="form-control"
            formControlName="password">
        <label
            class="inline-label"
            [class.active]="parent.get('password').value">
            Enter your password
        </label>
        <div
            class="invalid"
            *ngIf="validateService.required(parent, 'password')">
            <i class="zmdi zmdi-alert-circle"></i>
            Can't get in without your password! 🦇
        </div>
        <div
            class="invalid"
            *ngIf="validateService.minLength(parent, 'password')">
            <i class="zmdi zmdi-alert-circle"></i>
            Please include at least 6 characters
        </div>
        <div
            class="invalid"
            *ngIf="validateService.maxLength(parent, 'password')">
            <i class="zmdi zmdi-alert-circle"></i>
            Please limit your password to 30 characters
        </div>
        <div
            class="invalid"
            *ngIf="validateService.pattern(parent, 'password')">
            <i class="zmdi zmdi-alert-circle"></i>
            Please include at least 1 capital letter, 1 number, and 6 characters
        </div>
    </div>
  `
})
export class PasswordComponent {

  @Input() parent: FormGroup

  constructor(
    private validateService: ValidateService
  ) { }

  get invalidPassword() {
    return (
      this.parent.get('password').hasError('invalidPassword') &&
      this.parent.get('password').dirty &&
      !this.validateService.required(this.parent, 'password')
    )
  }

}
