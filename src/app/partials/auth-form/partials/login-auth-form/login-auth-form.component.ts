import { Component, Input, AfterViewInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { AuthService } from '../../../../services/auth.service'

@Component({
  selector: 'app-login-auth-form',
  templateUrl: './login-auth-form.component.html',
  styleUrls: ['../../auth-form.component.scss']
})
export class LoginAuthFormComponent implements AfterViewInit {

  @ViewChild('email') email: ElementRef
  @Input() parent: FormGroup

  constructor(
     private authService: AuthService
    ,private renderer: Renderer
  ) { }

  ngAfterViewInit() {
    this.renderer.invokeElementMethod(this.email.nativeElement, 'focus')
  }

  get invalidEmail() {
    return (
      this.parent.get('email').hasError('email') &&
      this.parent.get('email').dirty &&
      !this.required('email')
    )
  }

  get invalidPassword() {
    return (
      this.parent.get('password').hasError('invalidPassword') &&
      this.parent.get('password').dirty &&
      !this.required('password')
    )
  }

  /**
   * Returns required validity state
   *
   * @param {string} name
   * @returns
   *
   * @memberof LoginAuthFormComponent
   */
  required(name: string) {
    return (
      this.parent.get(name).hasError('required') &&
      this.parent.get(name).touched
    )
  }

}
