import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { ValidateService } from '../../services/validate.service'

@Component({
  selector: 'app-bio',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div [formGroup]="parent" class="form-group">
        <textarea
            #bio
            rows="3"
            class="form-control"
            [tabIndex]="tabIndex"
            formControlName="bio">
        </textarea>
        <label
            class="inline-label"
            [class.active]="parent.get('bio').value">
            Tell us about yourself
            <span class="faded">
                ...within 500 characters
            </span>
        </label>
        <div
            class="invalid"
            *ngIf="validateService.maxLength(parent, 'bio')">
            <i class="zmdi zmdi-alert-circle"></i>
            Please limit your bio to 500 characters!
        </div>
    </div>
  `
})
export class BioComponent {

  @Input() parent: FormGroup
  @Input() tabIndex: number

  constructor(
    private validateService: ValidateService
  ) { }

}
