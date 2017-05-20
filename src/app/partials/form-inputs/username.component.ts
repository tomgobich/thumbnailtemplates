import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { ValidateService } from '../../services/validate.service'

@Component({
  selector: 'app-username',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div [formGroup]="parent" class="form-group">
      <input
        #username
        type="text"
        class="form-control"
        formControlName="username">
      <label
        class="inline-label"
        [class.active]="parent.get('username').value">
        Enter a unique username
      </label>
      <div
        class="invalid"
        *ngIf="validateService.required(parent, 'username')">
        <i class="zmdi zmdi-alert-circle"></i>
        Please enter a unique username
      </div>
      <div
        class="invalid"
        *ngIf="validateService.minLength(parent, 'username')">
        <i class="zmdi zmdi-alert-circle"></i>
        Usernames must be at least 3 characters long!
      </div>
      <div
        class="invalid"
        *ngIf="validateService.maxLength(parent, 'username')">
        <i class="zmdi zmdi-alert-circle"></i>
        Usernames cannot be longer than 30 characters, sorry!
      </div>
      <div
        class="invalid"
        *ngIf="takenUsername">
        <i class="zmdi zmdi-alert-circle"></i>
        Sorry, that username is already taken, please try another! ☹️
      </div>
    </div>
  `
})
export class UsernameComponent {

  @Input() parent: FormGroup

  constructor(
    private validateService: ValidateService
  ) { }

  get takenUsername() {
    return (
      this.parent.get('username').hasError('takenUsername') &&
      this.parent.get('username').dirty
    )
  }

}
