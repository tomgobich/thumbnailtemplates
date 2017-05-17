import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-login-auth-form',
  templateUrl: './login-auth-form.component.html',
  styleUrls: ['../../auth-form.component.scss']
})
export class LoginAuthFormComponent {

  @Input() parent: FormGroup

  constructor() { }

}
