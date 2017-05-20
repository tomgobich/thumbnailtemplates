import { Component, OnInit, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthValidators } from '../../classes/validators/auth.validators'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {

  @Input() isLogin: boolean

  login = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, AuthValidators.password]]
  })

  signup = this.fb.group({
    required: this.fb.group({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }),
    optional: this.fb.group({
      youtube: '',
      twitter: '',
      facebook: '',
      bio: ''
    })
  })

  constructor(
     private fb: FormBuilder
    ,private authService: AuthService
  ) { }

  loginUser() {
    this.authService.login(
      this.login.get('email').value,
      this.login.get('password').value
    )
  }

  signupUser() {
    console.log(this.signup.value)
  }

}
