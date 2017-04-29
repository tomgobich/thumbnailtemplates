import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { ThumbService } from '../../services/thumb.service'
import { Thumb } from '../../models/thumb.model'

@Component({
  selector: 'app-featured-thumbnail',
  templateUrl: './featured-thumbnail.component.html',
  styleUrls: ['./featured-thumbnail.component.scss']
})
export class FeaturedThumbnailComponent implements OnInit {

  @Input() thumb: Thumb

  avatar: string

  constructor(private authService: AuthService, private thumbService: ThumbService) { }

  ngOnInit() {
    if(this.thumb) {
      console.log('trying to get thumb with', this.thumb.user.strEmail)
      this.avatar = this.authService.getAvatar(this.thumb.user.strEmail, 20)
    }
  }

}
