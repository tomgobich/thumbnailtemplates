import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ThumbService } from '../../../services/thumb.service'
import { UtilitiesService } from '../../../services/utilities.service'
import { Thumb } from '../../../models/thumb.model'
import { Category } from '../../../models/category.model'

import { environment } from '../../../../environments/environment'

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
    this.thumbService.getThumbnails(category.toLowerCase(), limit, skip).subscribe(thumbResults => {
      thumbResults.results.forEach(thumb => {
        this.thumbnails.push(this.utilitiesService.buildThumbnail(thumb))
      })

      this.paginationMax = Math.floor(thumbResults.count / this.limit)
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
    let show = Math.floor(this.paginationToShow / 2)
    let start = page - show > 0 ? page - show : 1
    let end = page + show > this.paginationMax ? this.paginationMax : page + show
    let arrayIndex = 0;

    if ((end - start) + 1 < this.paginationToShow) {
      start = (end - this.paginationToShow) + 1 > 0 ? (end - this.paginationToShow) + 1 : 1
    }

    if ((start + end) - 1 < this.paginationToShow) {
      end = (start + this.paginationToShow) - 1 > this.paginationMax ? this.paginationMax : (start + this.paginationToShow) - 1
    }

    for (let i = start; i <= end; i++, arrayIndex++) {
      this.pagination[arrayIndex] = i
    }
  }

  updateCategory(event: Event) {
    let selectedCategory = <HTMLSelectElement>event.currentTarget
    this.activeCategory = this.categories[selectedCategory.selectedIndex].strCategory.toLowerCase()
    this.router.navigate(['/thumbnails/browse', this.activeCategory, this.activePage])
  }

  updateLimit(event: Event) {
    let selectedLimit = <HTMLSelectElement>event.currentTarget
    let show = this.limits[selectedLimit.selectedIndex]
    this.router.navigate(['/thumbnails/browse', this.activeCategory, this.activePage], { queryParams: { show } })
  }

}
