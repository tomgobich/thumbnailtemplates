import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { ValidateService } from '../../../../services/validate.service'

@Component({
  selector: 'app-youtube',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div [formGroup]="parent" class="form-group">
        <input
            #youtube
            type="text"
            class="form-control"
            (focus)="setInitialFocusValue()"
            (focusout)="clearValueIfDefault()"
            [tabIndex]="tabIndex"
            formControlName="youtube">
        <label
            class="inline-label"
            [class.active]="parent.get('youtube').value">
            YouTube Url
            <span class="faded" *ngIf="optional">
                - Optional
            </span>
        </label>
        <div
            class="invalid"
            *ngIf="validateService.maxLength(parent, 'youtube')">
            <i class="zmdi zmdi-alert-circle"></i>
            Please limit your YouTube username to 50 characters
        </div>
        <div
            class="invalid"
            *ngIf="validateService.url(parent, 'youtube')">
            <i class="zmdi zmdi-alert-circle"></i>
            Please enter a full and valid URL, ex: http://youtube.com/user/thumbtemps
        </div>
    </div>
  `
})
export class YouTubeComponent {

  @Input() parent: FormGroup
  @Input() optional: boolean = false
  @Input() tabIndex: number

  isFirstFocus: boolean = true

  constructor(
    private validateService: ValidateService
  ) { }

  setInitialFocusValue() {
    if (this.isFirstFocus || this.parent.get('youtube').value == '') {
      this.parent.get('youtube').setValue('http://youtube.com/user/')
      this.isFirstFocus = false
    }
  }

  clearValueIfDefault() {
    if (this.parent.get('youtube').value.trim() == 'http://youtube.com/' ||
        this.parent.get('youtube').value.trim() == 'http://youtube.com/user/') {
      this.parent.get('youtube').setValue('')
    }
  }

}
