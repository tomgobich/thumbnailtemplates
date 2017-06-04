import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { environment } from '../../../environments/environment'
import { UtilitiesService } from '../utilities.service'

@Injectable()
export class ApiThumbService {

  apiUrl = environment.apiUrl

  constructor(
     private http: Http
    ,private utilitiesService: UtilitiesService
  ) { }

  /**
   * Gets all thumbnails, with optional limit
   *
   * @param {string} [category]
   * @param {number} [limit]
   * @param {number} [skip]
   * @returns
   *
   * @memberof ApiThumbService
   */
  getThumbnails(category: string, limit?: number, skip?: number) {
    return this.http.get(`${this.apiUrl}/thumbnails/all/${category}/${limit}/${skip}`).map(res => res.json())
  }

  /**
   * Gets all featured thumbnails with optional limit
   *
   * @param {number} [limit]
   * @returns
   *
   * @memberof ApiThumbService
   */
  getFeaturedThumbnails(limit?: number) {
    return this.http.get(`${this.apiUrl}/thumbnails/featured/${limit}`).map(res => res.json())
  }

  /**
   * Gets all thumbnails by most liked with optional limit
   *
   * @param {number} [limit]
   * @returns
   *
   * @memberof ApiThumbService
   */
  getMostLikedThumbnails(limit?: number) {
    return this.http.get(`${this.apiUrl}/thumbnails/liked/${limit}`).map(res => res.json())
  }

  /**
   * Gets listing of categories
   *
   * @returns
   *
   * @memberof ApiThumbService
   */
  getCategories() {
    return this.http.get(`${this.apiUrl}/thumbnails/categories`).map(res => res.json())
  }
}
