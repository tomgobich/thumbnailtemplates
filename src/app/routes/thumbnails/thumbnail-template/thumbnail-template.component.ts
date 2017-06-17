import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ThumbService } from '../../../services/thumb.service'
import { UtilitiesService } from '../../../services/utilities.service'

import { Thumb } from '../../../models/thumb.model'

@Component({
  selector: 'app-thumbnail-template',
  templateUrl: './thumbnail-template.component.html',
  styleUrls: ['./thumbnail-template.component.scss']
})
export class ThumbnailTemplateComponent implements OnInit {

  alias: string
  thumb: Thumb

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
      })
    })
  }

}
