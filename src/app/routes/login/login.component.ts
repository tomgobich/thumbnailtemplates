import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: boolean

  constructor(
     private route: ActivatedRoute
    ,private router: Router
  ) { }

  ngOnInit() {
    this.login = this.route.snapshot.data["login"]
  }

}
