import { Component, Input, AfterViewInit, Renderer, ViewChild, ElementRef } from '@angular/core'
import { Router, ActivatedRoute, Params, Data } from '@angular/router'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { AuthValidators } from '../../classes/validators/auth.validators'
import { AuthService } from '../../services/auth.service'
import { ApiAuthService } from '../../services/api/api-auth.service'
import { ValidateService } from '../../services/validate.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements AfterViewInit {

  @ViewChild('username') username: ElementRef
  @Input() parent: FormGroup

  signup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)], this.uniqueUsername.bind(this)],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, AuthValidators.password]],
    confirmPassword: '',
    youtube: '',
    twitter: '',
    facebook: '',
    bio: ''
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
    console.log(this.signup.value)
  }

  uniqueUsername(control: AbstractControl) {
    console.log({this: this})
    return new Promise(resolve => {
      this.apiAuthService.isUsernameUnique(control.value)
      .then(isAvailable => {
        console.log({isAvailable})

        if(isAvailable) {
          resolve(null)
        }
        else {
          resolve({ takenUsername: true })
        }
      })
    })



    // this.apiAuthService.isUsernameUnique(control.value)
    // .then(isAvailable => isAvailable ? null : { takenUsername: true })
  }

}
