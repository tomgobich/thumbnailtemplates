import { Component, OnInit } from '@angular/core'
import { ThumbService } from '../../services/thumb.service'
import { Thumb } from '../../models/thumb.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  featuredThumbnails: Array<Thumb> = []

  constructor(private thumbService: ThumbService) {}

  ngOnInit() {
    this.thumbService.getFeaturedThumbnails().subscribe(thumbnails => {
      thumbnails.forEach(thumb => {
        this.featuredThumbnails.push(this.thumbService.buildThumbnail(thumb))
      })
    })
  }

}
