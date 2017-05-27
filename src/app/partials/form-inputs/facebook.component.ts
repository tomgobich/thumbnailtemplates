import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { ValidateService } from '../../services/validate.service'

@Component({
  selector: 'app-facebook',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div [formGroup]="parent" class="form-group">
        <input
            type="text"
            class="form-control"
            [tabIndex]="tabIndex"
            formControlName="facebook">
        <label
            class="inline-label"
            [class.active]="parent.get('facebook').value">
            What's your Facebook username?
            <span class="faded">
                Ex: thumbtemps
            </span>
            <span class="faded" *ngIf="optional">
                - Optional
            </span>
        </label>
        <div
            class="invalid"
            *ngIf="validateService.maxLength(parent, 'facebook')">
            <i class="zmdi zmdi-alert-circle"></i>
            Please limit your Facebook username to 50 characters
        </div>
        <div
            class="invalid"
            *ngIf="validateService.pattern(parent, 'facebook')">
            <i class="zmdi zmdi-alert-circle"></i>
            Please only enter your username, ex: thumbtemps
        </div>
    </div>
  `
})
export class FacebookComponent {

  @Input() parent: FormGroup
  @Input() optional: boolean = false
  @Input() tabIndex: number

  constructor(
    private validateService: ValidateService
  ) { }

}
