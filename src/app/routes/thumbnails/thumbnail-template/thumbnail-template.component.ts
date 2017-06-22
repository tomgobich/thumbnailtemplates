import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ThumbService } from '../../../services/thumb.service'
import { UtilitiesService } from '../../../services/utilities.service'

import { Thumb } from '../../../models/thumb.model'
import { Image } from '../../../models/image.model'

@Component({
  selector: 'app-thumbnail-template',
  templateUrl: './thumbnail-template.component.html',
  styleUrls: ['./thumbnail-template.component.scss']
})
export class ThumbnailTemplateComponent implements OnInit {

  alias: string
  thumb: Thumb
  imageGallery: Array<Image>
  modalImage: Image

  isScrollableLeft: boolean = true
  isScrollableRight: boolean = true
  isScrollingLeft: boolean = false
  isScrollingRight: boolean = false

  constructor(
     private route: ActivatedRoute
    ,private thumbService: ThumbService
    ,private utilitiesService: UtilitiesService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.alias = params["alias"] || ""
      
      this.thumbService.getThumbnailByAlias(this.alias).subscribe(thumb => {
        this.thumb = this.utilitiesService.buildThumbnail(thumb)
        
        this.thumbService.getThumbnailImagesById(this.thumb.strTemplateID).subscribe(images => this.imageGallery = images)
      })
    })
  }

  setScrollable($event: MouseEvent) {
    // let target = (<HTMLDivElement>$event.target) 
    // let galleryLength = target.querySelectorAll('.gallery-image').length
    // let galleryItemWidth = target.querySelector('.gallery-image').clientWidth
    // let targetWidth = target.clientWidth

    // if (galleryLength * galleryItemWidth > targetWidth) {
    //   this.isScrollableRight = true
    // }
  }

  scrollLeft($event: MouseEvent) {
    let target = (<HTMLDivElement>$event.target)
    target.parentElement.querySelector('.gallery-slider').classList.add('scroll-left')    
  }

  scrollRight($event: MouseEvent) {
    let target = (<HTMLDivElement>$event.target)
    target.parentElement.querySelector('.gallery-slider').classList.add('scroll-right')
  }

  scrollNone($event: MouseEvent) {
    let target = (<HTMLDivElement>$event.target)
    target.parentElement.querySelector('.gallery-slider').classList.remove('scroll-right')
    target.parentElement.querySelector('.gallery-slider').classList.remove('scroll-left')
  }

}
