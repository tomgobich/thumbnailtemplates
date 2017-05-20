import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { ValidateService } from '../../services/validate.service'

@Component({
  selector: 'app-email',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div [formGroup]="parent" class="form-group">
      <input
        #email
        type="email"
        class="form-control"
        formControlName="email">
      <label
        class="inline-label"
        [class.active]="parent.get('email').value">
        Enter your email
      </label>
      <div
        class="invalid"
        *ngIf="validateService.required(parent, 'email')">
        <i class="zmdi zmdi-alert-circle"></i>
        Please enter an email
      </div>
      <div
        class="invalid"
        *ngIf="invalidEmail">
        <i class="zmdi zmdi-alert-circle"></i>
        Please use a valid email
      </div>
    </div>
  `
})
export class EmailComponent {

  @Input() parent: FormGroup

  constructor(
    private validateService: ValidateService
  ) { }

  get invalidEmail() {
    return (
      this.parent.get('email').hasError('email') &&
      this.parent.get('email').dirty &&
      !this.validateService.required(this.parent, 'email')
    )
  }

}
