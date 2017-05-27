import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { AuthService } from './auth.service'
import { Thumb } from '../models/thumb.model'
import { Image } from '../models/image.model'
import { User } from '../models/user.model'
import { Ng2ImgToolsService } from 'ng2-img-tools'
import { ApiThumbService } from './api/api-thumb.service'
import { environment } from '../../environments/environment'
import 'rxjs/Rx';

@Injectable()
export class ThumbService {

  apiUrl = environment.apiUrl
  imagePath = environment.imageUrl

  constructor(
     private http: Http
    ,private authService: AuthService
    ,private apiThumbService: ApiThumbService
    ,private imgToolsService: Ng2ImgToolsService
    ) { }

  getThumbnails(limit?: number) {
    return this.apiThumbService.getThumbnails(limit)
  }

  getFeaturedThumbnails(limit?: number) {
    return this.apiThumbService.getFeaturedThumbnails(limit)
  }

  getMostLikedThumbnails(limit?: number) {
    return this.apiThumbService.getMostLikedThumbnails(limit)
  }

  imgResized(file: File[], maxWidth: number, maxHeight: number) {
    return this.imgToolsService.resize(file, maxWidth, maxHeight).subscribe(
        image => image,
        error => error.error
    )
  }

  buildThumbnail(data): Thumb {
    let thumb = new Thumb
    let user = this.authService.buildUser(data)
    let image = this.buildImage(data)

    thumb.strTemplateID               = data.strTemplateID
    thumb.strTemplateTitle            = data.strTemplateTitle
    thumb.strTemplateAlias            = data.strTemplateAlias
    thumb.strTemplateDescription      = data.strTemplateDescription
    thumb.strTemplateKeywords         = data.strTemplateKeywords
    thumb.strTemplateUploadDate       = data.strTemplateUploadDate
    thumb.strTemplateDownload         = data.strTemplateDownload
    thumb.intTemplateSortOrder        = data.intTemplateSortOrder
    thumb.intTemplateViewCount        = data.intTemplateViewCount
    thumb.intTemplateLikeCount        = data.intTemplateLikeCount
    thumb.intTemplateDownloadCount    = data.intTemplateDownloadCount
    thumb.strTemplateDownloadContents = data.strTemplateDownloadContents
    thumb.dteTemplateLastUpdatedDate  = data.dteTemplateLastUpdatedDate
    thumb.dteTemplateReleaseDate      = data.dteTemplateReleaseDate
    thumb.intTemplateStatusID         = data.intTemplateStatusID
    thumb.intCategoryID               = data.intCategoryID
    thumb.strCategory                 = data.strCategory
    thumb.strFontID                   = data.strFontID
    thumb.strFont                     = data.strFont
    thumb.strFontDownload             = data.strFontDownload
    thumb.intFontSortOrder            = data.intFontSortOrder
    thumb.image                       = image
    thumb.user                        = user

    return thumb
  }

  buildImage(data): Image {
    let image = new Image

    image.strImageID          = data.strImageID
    image.strImageTitle       = data.strImageTitle
    image.strImageOwner       = data.strImageOwner
    image.strImageAlias       = data.strImageAlias
    image.dteImageUploadDate  = data.dteImageUploadDate
    image.blnIsFeaturedImage  = data.blnIsFeaturedImage

    return image
  }

}
