import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {

  @Input() isLogin: boolean

  login: FormGroup
  signup: FormGroup

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.isLogin ? this.buildLoginForm() : this.buildSignupForm()
  }

  buildLoginForm() {
    this.login = this.fb.group({
      email: '',
      password: ''
    })
  }

  buildSignupForm() {
    this.signup = this.fb.group({
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
  }

}
