import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AuthService } from '../../../services/auth.service'
import { User } from '../../../models/user.model'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User

  constructor(
     private route: ActivatedRoute
    ,private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const username = params["username"]

      this.authService.getUserByUsername(username).then(userData => {
        this.user = this.authService.buildUser(userData.user)
      })
    })
  }

}
