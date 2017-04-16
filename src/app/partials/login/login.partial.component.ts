import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'partial-login',
  templateUrl: './login.partial.component.html',
  styleUrls: ['./login.partial.component.scss']
})
export class LoginPartialComponent implements OnInit {

  @Input() login: boolean = false;

  pageHeading: string;
  pageInstructions: string

  constructor(private auth: AuthService) { }

  ngOnInit() {
    if(this.login) {
      this.pageHeading = "Login"
      this.pageInstructions = "Please login using your email and password"
    }
    else {
      this.pageHeading = "Signup"
      this.pageInstructions = "Please signup by filling out the required fields"
    }

  }

}
