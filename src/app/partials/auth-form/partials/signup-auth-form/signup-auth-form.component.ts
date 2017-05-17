import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-signup-auth-form',
  templateUrl: './signup-auth-form.component.html',
  styleUrls: ['../../auth-form.component.scss']
})
export class SignupAuthFormComponent {

  @Input() parent: FormGroup

  constructor() { }

}
