import { Component, Input, AfterViewInit, Renderer, ViewChild, ElementRef } from '@angular/core'
import { Router, ActivatedRoute, Params, Data } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthValidators } from '../../classes/validators/auth.validators'
import { AuthService } from '../../services/auth.service'
import { ValidateService } from '../../services/validate.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('email') email: ElementRef
  @Input() parent: FormGroup

  login = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, AuthValidators.password]]
  })

  constructor(
     private fb: FormBuilder
    ,private route: ActivatedRoute
    ,private router: Router
    ,private renderer: Renderer
    ,private authService: AuthService
    ,private validateService: ValidateService
  ) { }

  ngAfterViewInit() {
    // this.renderer.invokeElementMethod(this.email.nativeElement, 'focus')
  }

  loginUser() {
    this.authService.login(
      this.login.get('email').value,
      this.login.get('password').value
    )
  }

}
