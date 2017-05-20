import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { ValidateService } from '../../services/validate.service'

@Component({
  selector: 'app-youtube',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div [formGroup]="parent" class="form-group">
        <input
            #youtube
            type="text"
            class="form-control"
            formControlName="youtube">
        <label
            class="inline-label"
            [class.active]="parent.get('youtube').value">
            What's your YouTube username?
        </label>
        <div
            class="invalid"
            *ngIf="validateService.maxLength(parent, 'youtube')">
            <i class="zmdi zmdi-alert-circle"></i>
            Please limit your password to 30 characters
        </div>
        <div
            class="invalid"
            *ngIf="validateService.pattern(parent, 'youtube')">
            <i class="zmdi zmdi-alert-circle"></i>
            Please only enter your username, ex: thumbtemps
        </div>
    </div>
  `
})
export class YouTubeComponent {

  @Input() parent: FormGroup

  constructor(
    private validateService: ValidateService
  ) { }

  get invalidPassword() {
    return (
      this.parent.get('youtube').hasError('invalidPassword') &&
      this.parent.get('youtube').dirty &&
      !this.validateService.required(this.parent, 'youtube')
    )
  }

}
