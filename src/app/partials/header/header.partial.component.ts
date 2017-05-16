import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'partial-header',
  templateUrl: './header.partial.component.html',
  styleUrls: ['./header.partial.component.scss']
})
export class HeaderPartialComponent implements OnInit {

  // TODO: Change auth to authService to match rest of project

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
