import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { ValidateService } from '../../services/validate.service'

@Component({
  selector: 'app-twitter',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div [formGroup]="parent" class="form-group">
        <input
            #twitter
            type="text"
            class="form-control"
            [tabIndex]="tabIndex"
            formControlName="twitter">
        <label
            class="inline-label"
            [class.active]="parent.get('twitter').value">
            What's your Twitter username?
            <span class="faded">
                Ex: thumbtemps
            </span>
            <span class="faded" *ngIf="optional">
                - Optional
            </span>
        </label>
        <div
            class="invalid"
            *ngIf="validateService.maxLength(parent, 'twitter')">
            <i class="zmdi zmdi-alert-circle"></i>
            Please limit your Twitter username to 50 characters
        </div>
        <div
            class="invalid"
            *ngIf="validateService.pattern(parent, 'twitter')">
            <i class="zmdi zmdi-alert-circle"></i>
            Please only enter your username, ex: thumbtemps
        </div>
    </div>
  `
})
export class TwitterComponent {

  @Input() parent: FormGroup
  @Input() optional: boolean = false
  @Input() tabIndex: number

  constructor(
    private validateService: ValidateService
  ) { }

}
