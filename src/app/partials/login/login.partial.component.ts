import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service'

@Component({
  selector: 'partial-login',
  templateUrl: './login.partial.component.html',
  styleUrls: ['./login.partial.component.scss']
})
export class LoginPartialComponent implements OnInit {

  @Input() isLogin: boolean

  constructor(
     private auth: AuthService
    ,private validateService: ValidateService
  ) { }

  ngOnInit() {
  }
  
}
