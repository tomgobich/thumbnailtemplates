import { Component, Input, AfterViewInit, Renderer, ViewChild, ElementRef } from '@angular/core'
import { Router, ActivatedRoute, Params, Data } from '@angular/router'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { AuthValidators } from '../../../classes/validators/auth.validators'
import { AuthService } from '../../../services/auth.service'
import { ApiAuthService } from '../../../services/api/api-auth.service'
import { ValidateService } from '../../../services/validate.service'
import { regex } from '../../../../environments/environment'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements AfterViewInit {

  @ViewChild('username') username: ElementRef
  @Input() parent: FormGroup

  signup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(regex.textCharacters)], this.uniqueUsername.bind(this)],
    email: ['', [Validators.required, Validators.email], this.uniqueEmail.bind(this)],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern(regex.mediumPassword)]],
    passwordConfirm: ['', [Validators.required, AuthValidators.passwordMatch]],
    youtube: ['', [Validators.maxLength(50), AuthValidators.youtubeUrlPattern]],
    twitter: ['', [Validators.maxLength(50), AuthValidators.twitterUrlPattern]],
    facebook: ['', [Validators.maxLength(50), AuthValidators.facebookUrlPattern]],
    bio: ['', [Validators.maxLength(500)]]
  })

  constructor(
     private fb: FormBuilder
    ,private route: ActivatedRoute
    ,private router: Router
    ,private renderer: Renderer
    ,private authService: AuthService
    ,private apiAuthService: ApiAuthService
    ,private validateService: ValidateService
  ) {



  }

  ngAfterViewInit() {
    // this.renderer.invokeElementMethod(this.email.nativeElement, 'focus')
  }

  signupUser() {
    this.authService.signup(this.signup.value)
  }

  uniqueUsername(control: AbstractControl) {
    return new Promise(resolve => {
      this.apiAuthService.isUsernameUnique(control.value)
      .then(isAvailable => isAvailable ? resolve(null) : resolve({ takenUsername: true }))
    })
  }

  uniqueEmail(control: AbstractControl) {
    return new Promise(resolve => {
      this.apiAuthService.isEmailUnique(control.value)
      .then(isAvailable => isAvailable ? resolve(null) : resolve({ takenEmail: true }))
    })
  }

}
