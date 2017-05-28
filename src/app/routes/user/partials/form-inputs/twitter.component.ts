import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { ValidateService } from '../../../../services/validate.service'

@Component({
  selector: 'app-twitter',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div [formGroup]="parent" class="form-group">
        <input
            #twitter
            type="text"
            class="form-control"
            (focus)="setInitialFocusValue()"
            (focusout)="clearValueIfDefault()"
            [tabIndex]="tabIndex"
            formControlName="twitter">
        <label
            class="inline-label"
            [class.active]="parent.get('twitter').value">
            Twitter Url
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
            *ngIf="validateService.url(parent, 'twitter')">
            <i class="zmdi zmdi-alert-circle"></i>
            Please enter a full and valid URL, ex: http://twitter.com/thumbtemps
        </div>
    </div>
  `
})
export class TwitterComponent {

  @Input() parent: FormGroup
  @Input() optional: boolean = false
  @Input() tabIndex: number

  isFirstFocus: boolean = true

  constructor(
    private validateService: ValidateService
  ) { }

  setInitialFocusValue() {
    if (this.isFirstFocus || this.parent.get('twitter').value == '') {
      this.parent.get('twitter').setValue('http://twitter.com/')
    }
  }

  clearValueIfDefault() {
    if (this.parent.get('twitter').value.trim() == 'http://twitter.com/') {
      this.parent.get('twitter').setValue('')
    }
  }

}
