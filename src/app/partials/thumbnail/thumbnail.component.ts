import { Component, OnInit, Input } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { ThumbService } from '../../services/thumb.service'
import { Thumb } from '../../models/thumb.model'

@Component({
  selector: 'partial-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent implements OnInit {

    @Input() thumb: Thumb

    avatar: string
    thumbImage: string

    constructor(
      private authService: AuthService, 
      private thumbService: ThumbService
    ) { }

    ngOnInit() {
      if(this.thumb) {
        this.avatar = this.authService.getAvatar(this.thumb.user.strEmail, 20)
        this.thumbImage = this.thumbService.imagePath + this.thumb.image.strImageAlias
      }
    }

}
