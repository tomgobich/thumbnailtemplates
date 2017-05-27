import { Component, OnInit } from '@angular/core'
import { ThumbService } from '../../services/thumb.service'
import { Thumb } from '../../models/thumb.model'
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  featuredThumbnails: Array<Thumb> = []
  mostLikedThumbnails: Array<Thumb> = []
  newestThumbnails: Array<Thumb> = []

  constructor(private thumbService: ThumbService) {}

  ngOnInit() {
    this.thumbService.getFeaturedThumbnails().subscribe(thumbnails => {
      thumbnails.forEach(thumb => {
        this.featuredThumbnails.push(this.thumbService.buildThumbnail(thumb))
      })
    })

    this.thumbService.getMostLikedThumbnails().subscribe(thumbnails => {
      thumbnails.forEach(thumb => {
        this.mostLikedThumbnails.push(this.thumbService.buildThumbnail(thumb))
      })
    })

    this.thumbService.getThumbnails().subscribe(thumbnails => {
      thumbnails.forEach(thumb => {
        this.newestThumbnails.push(this.thumbService.buildThumbnail(thumb))
      })
    })
  }

}
