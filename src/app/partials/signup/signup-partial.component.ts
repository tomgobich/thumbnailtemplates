import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'partial-signup',
  templateUrl: './signup-partial.component.html',
  styleUrls: ['./signup-partial.component.scss']
})
export class SignupPartialComponent implements OnInit {

  pageHeading: string;
  pageInstructions: string

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.pageHeading = "Signup"
    this.pageInstructions = "Please signup by filling out the required fields"
  }

}
