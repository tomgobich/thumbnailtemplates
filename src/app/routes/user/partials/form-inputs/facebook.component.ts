import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { ValidateService } from '../../../../services/validate.service'

@Component({
  selector: 'app-facebook',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div [formGroup]="parent" class="form-group">
        <input
            type="text"
            class="form-control"
            (focus)="setInitialFocusValue()"
            (focusout)="clearValueIfDefault()"
            [tabIndex]="tabIndex"
            formControlName="facebook">
        <label
            class="inline-label"
            [class.active]="parent.get('facebook').value">
            Facebook Url
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
            *ngIf="validateService.url(parent, 'facebook')">
            <i class="zmdi zmdi-alert-circle"></i>
            Please enter a full and valid URL, ex: http://facebook.com/thumbtemps
        </div>
    </div>
  `
})
export class FacebookComponent {

  @Input() parent: FormGroup
  @Input() optional: boolean = false
  @Input() tabIndex: number

  isFirstFocus: boolean = true

  constructor(
    private validateService: ValidateService
  ) { }

  setInitialFocusValue() {
    if (this.isFirstFocus || this.parent.get('facebook').value == '') {
      this.parent.get('facebook').setValue('http://facebook.com/')
    }
  }

  clearValueIfDefault() {
    if (this.parent.get('facebook').value.trim() == 'http://facebook.com/') {
      this.parent.get('facebook').setValue('')
    }
  }

}
