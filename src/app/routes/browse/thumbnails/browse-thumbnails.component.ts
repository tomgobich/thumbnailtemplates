import { Component, OnInit } from '@angular/core'
import { ThumbService } from '../../../services/thumb.service'
import { UtilitiesService } from '../../../services/utilities.service'
import { Thumb } from '../../../models/thumb.model'
import { Category } from '../../../models/category.model'

@Component({
  selector: 'app-thumbnails',
  templateUrl: './browse-thumbnails.component.html',
  styleUrls: ['./browse-thumbnails.component.scss']
})
export class BrowseThumbnailsComponent implements OnInit {

  thumbnails: Array<Thumb>
  categories: Array<Category> = [{ intCategoryID: null, strCategory: 'All' }]
  activeCategoryID: Number = null
  activeCategoryName: String = 'All'
  limit: Number = 16              // Number to limit per-page
  skip: Number = 0                // Number of results to skip

  constructor(
     private thumbService: ThumbService
    ,private utilitiesService: UtilitiesService
  ) { }

  ngOnInit() {
    this.getCategories()
    this.getThumbnails()
  }

  getThumbnails(intCategoryID?: number) {
    this.thumbnails = []
    this.thumbService.getThumbnails(this.limit, this.skip, intCategoryID).subscribe(thumbnails => {
      thumbnails.forEach(thumb => {
        this.thumbnails.push(this.utilitiesService.buildThumbnail(thumb))
      })
    })
  }

  getCategories() {
    this.thumbService.getCategories().subscribe(categories => {
      categories.forEach(category => {
        this.categories.push(category)
      })
    })
  }

  updateCategory(event: Event) {
    let selectedCategory = <HTMLSelectElement>event.currentTarget
    this.getThumbnails(parseInt(selectedCategory.value))
    this.activeCategoryID = parseInt(selectedCategory.value)
    this.activeCategoryName = this.categories[selectedCategory.selectedIndex].strCategory
  }

}
