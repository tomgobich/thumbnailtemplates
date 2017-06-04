import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { ValidateService } from '../../../../services/validate.service'

@Component({
  selector: 'app-bio',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div [formGroup]="parent" class="form-group">
        <div
            [title]="tooltip"
            uk-tooltip="pos: bottom-right">
            <textarea
                #bio
                rows="3"
                class="form-control"
                [tabIndex]="tabIndex"
                (input)="getRemainingCharCount()"
                formControlName="bio">
            </textarea>
            <label
                class="inline-label"
                [class.active]="parent.get('bio').value">
                Tell us about yourself
                <span class="faded" *ngIf="optional">
                    - Optional
                </span>
            </label>
            <div
                class="invalid"
                *ngIf="validateService.maxLength(parent, 'bio')">
                <i class="zmdi zmdi-alert-circle"></i>
                Please limit your bio to 500 characters!
            </div>
        </div>
    </div>
  `
})
export class BioComponent {

  @Input() parent: FormGroup
  @Input() optional: boolean = false
  @Input() tabIndex: number

  tooltip: string = "You have 500 characters, go wild!"

  constructor(
    private validateService: ValidateService
  ) { }

  getRemainingCharCount() {
      let remainingChars = 500 - this.parent.get('bio').value.length
      this.tooltip = `You have ${remainingChars} characters left!`
  }

}
