import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {

  @Input() isLogin: boolean

  login = this.fb.group({
    email: '',
    password: ''
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
  ) { }

  loginUser() {
    console.log(this.login.value)
  }

  signupUser() {
    console.log(this.signup.value)
  }

}
