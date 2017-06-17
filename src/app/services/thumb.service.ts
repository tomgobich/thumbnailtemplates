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
   * Gets a single thumbnail by it's Id
   * 
   * @param {string} Id 
   * @returns 
   * 
   * @memberof ThumbService
   */
  getThumbnailById(Id: string) {
    return this.apiThumbService.getThumbnailById(Id)
  }

  /**
   * Gets a single thumbnail by it's alias
   * 
   * @param {string} alias 
   * @returns 
   * 
   * @memberof ThumbService
   */
  getThumbnailByAlias(alias: string) {
    return this.apiThumbService.getThumbnailByAlias(alias)
  }

  /**
   * Gets array of thumbnails
   *
   * @param {number} [limit]
   * @param {number} [skip]
   * @param {string} [category]
   * @returns
   *
   * @memberof ThumbService
   */
  getThumbnails(category: string, limit?: number, skip?: number) {
    return this.apiThumbService.getThumbnails(category, limit, skip)
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
