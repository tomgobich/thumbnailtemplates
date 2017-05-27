import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'partial-header',
  templateUrl: './header.partial.component.html',
  styleUrls: ['./header.partial.component.scss']
})
export class HeaderPartialComponent implements OnInit {

  isNavMoreActive: boolean = false
  isProfileNavActive: boolean = false

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  toggleIsNavMoreActive() {
    this.isNavMoreActive = this.isNavMoreActive ? false : true
    this.isProfileNavActive = this.isNavMoreActive ? false : this.isProfileNavActive
  }

  toggleIsProfileNavActive() {
    this.isProfileNavActive = this.isProfileNavActive ? false : true
    this.isNavMoreActive = this.isProfileNavActive ? false : this.isNavMoreActive
  }

  onProfileNavClickOutside(e: Event) {
    console.log('clicked outside', e);
  }

}
