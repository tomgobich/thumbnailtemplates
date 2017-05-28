import { Injectable } from '@angular/core'
import { Ng2ImgToolsService } from 'ng2-img-tools'
import { ApiThumbService } from './api/api-thumb.service'
import { environment } from '../../environments/environment'
import 'rxjs/Rx';

@Injectable()
export class ThumbService {

  apiUrl = environment.apiUrl
  imagePath = environment.imageUrl

  constructor(
     private apiThumbService: ApiThumbService
    ,private imgToolsService: Ng2ImgToolsService
    ) { }

  /**
   * Gets array of thumbnails
   *
   * @param {Number} [limit]
   * @param {Number} [skip]
   * @param {Number} [intCategoryID]
   * @returns
   *
   * @memberof ThumbService
   */
  getThumbnails(limit?: Number, skip?: Number, intCategoryID?: Number) {
    return this.apiThumbService.getThumbnails(limit, skip, intCategoryID)
  }

  /**
   * Gets array of featured thumbnails
   *
   * @param {number} [limit]
   * @returns
   *
   * @memberof ThumbService
   */
  getFeaturedThumbnails(limit?: number) {
    return this.apiThumbService.getFeaturedThumbnails(limit)
  }

  /**
   * Gets array of thumbnails ordered by most liked
   *
   * @param {number} [limit]
   * @returns
   *
   * @memberof ThumbService
   */
  getMostLikedThumbnails(limit?: number) {
    return this.apiThumbService.getMostLikedThumbnails(limit)
  }

  /**
   * Gets array of categories
   *
   * @returns
   *
   * @memberof ThumbService
   */
  getCategories() {
    return this.apiThumbService.getCategories()
  }

  /**
   * Resizes image to match restriction params
   *
   * @param {File[]} file
   * @param {number} maxWidth
   * @param {number} maxHeight
   * @returns
   *
   * @memberof ThumbService
   */
  imgResized(file: File[], maxWidth: number, maxHeight: number) {
    return this.imgToolsService.resize(file, maxWidth, maxHeight).subscribe(
        image => image,
        error => error.error
    )
  }

}
