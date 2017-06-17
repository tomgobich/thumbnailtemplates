import { Component, OnInit } from '@angular/core'
import { ThumbService } from '../../services/thumb.service'
import { UtilitiesService } from '../../services/utilities.service'
import { Thumb } from '../../models/thumb.model'
import { environment } from '../../../environments/environment';

import { Category } from '../../models/category.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  featuredThumbnails: Array<Thumb> = []
  mostLikedThumbnails: Array<Thumb> = []
  newestThumbnails: Array<Thumb> = []

  constructor(
     private thumbService: ThumbService
    ,private utilitiesService: UtilitiesService
  ) {}

  ngOnInit() {
    this.thumbService.getFeaturedThumbnails(8).subscribe(thumbnails => {
      thumbnails.forEach(thumb => {
        this.featuredThumbnails.push(this.utilitiesService.buildThumbnail(thumb))
      })
    })

    this.thumbService.getMostLikedThumbnails(12).subscribe(thumbnails => {
      thumbnails.forEach(thumb => {
        this.mostLikedThumbnails.push(this.utilitiesService.buildThumbnail(thumb))
      })
    })

    this.thumbService.getThumbnails('all', 16).subscribe(thumbnails => {
      console.log({thumbnails})
      thumbnails.results.forEach(thumb => {
        this.newestThumbnails.push(this.utilitiesService.buildThumbnail(thumb))
      })
    })
  }

}
