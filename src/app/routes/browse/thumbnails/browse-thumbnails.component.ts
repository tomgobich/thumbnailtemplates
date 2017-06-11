import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ThumbService } from '../../../services/thumb.service'
import { UtilitiesService } from '../../../services/utilities.service'
import { Thumb } from '../../../models/thumb.model'
import { Category } from '../../../models/category.model'

import { environment } from '../../../../environments/environment'

// TODO: Return total count to get total number of pages
// TODO: Move pagination into own partial component

@Component({
  selector: 'app-thumbnails',
  templateUrl: './browse-thumbnails.component.html',
  styleUrls: ['./browse-thumbnails.component.scss']
})
export class BrowseThumbnailsComponent implements OnInit {

  thumbnails: Array<Thumb>
  categories: Array<Category> = [{ intCategoryID: null, strCategory: 'All' }]
  pagination: Array<number>
  paginationToShow: number = environment.paginationToShow
  paginationMax: number = 1
  limits: Array<number> = [8, 16, 24, 32]
  limit: number = 16

  activeCategory: string = "all"
  activePage: number = 1

  constructor(
     private route: ActivatedRoute
    ,private router: Router
    ,private thumbService: ThumbService
    ,private utilitiesService: UtilitiesService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.activeCategory = params["category"] || 'all'
      this.activePage = parseInt(params["activePage"]) || 1

      this.route.queryParams.subscribe(queryParams => {
        this.limit = parseInt(queryParams["show"]) || 16

        let skip = this.activePage * this.limit == 1 * this.limit ? 0 : this.activePage * this.limit

        this.getThumbnails(this.activeCategory, this.limit, skip)
      })
    })

    this.getCategories()
  }

  getThumbnails(category: string, limit: number, skip?: number) {
    this.thumbnails = []
    this.thumbService.getThumbnails(category.toLowerCase(), limit, skip).subscribe(thumbnails => {
      thumbnails.results.forEach(thumb => {
        this.thumbnails.push(this.utilitiesService.buildThumbnail(thumb))
      })

      this.paginationMax = thumbnails.count / this.limit
      this.getPagination(this.activePage)
    })
  }

  getCategories() {
    this.thumbService.getCategories().subscribe(categories => {
      categories.forEach(category => {
        this.categories.push(category)
      })
    })
  }

  getPagination(page: number) {
    this.pagination = []
    let start = Math.floor(-(this.paginationToShow / 2) + 1)    // Go back to put active in middle
    let end = this.paginationToShow                             // Length of pagination array
    let arrayIndex = 0                                          // Current index to input value

    for (let i = start; arrayIndex < end; i++, arrayIndex++) {
      let current = page + i
      current > 0 ? this.pagination[arrayIndex] = current : arrayIndex--
      if (current == this.paginationMax) break
    }
  }

  updateCategory(event: Event) {
    let selectedCategory = <HTMLSelectElement>event.currentTarget
    this.activeCategory = this.categories[selectedCategory.selectedIndex].strCategory.toLowerCase()
    this.router.navigate(['/thumbnails', this.activeCategory, this.activePage])
  }

  updateLimit(event: Event) {
    let selectedLimit = <HTMLSelectElement>event.currentTarget
    let show = this.limits[selectedLimit.selectedIndex]
    this.router.navigate(['/thumbnails', this.activeCategory, this.activePage], { queryParams: { show } })
  }

}
