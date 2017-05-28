import { Injectable } from '@angular/core';
import { Thumb } from '../models/thumb.model'
import { Category } from '../models/category.model'
import { Image } from '../models/image.model'
import { User } from '../models/user.model'

@Injectable()
export class UtilitiesService {

  /**
   * Builds an api response object to consistently handle responses
   *
   * @param {*} [res]
   * @param {boolean} [err]
   * @param {string} [msg]
   * @returns
   *
   * @memberof UtilitiesService
   */
  buildResponseObject(res?: any, err?: boolean, msg?: string) {
    const data      = res ? res : ''
    const hasError  = err ? err : false
    const message   = msg ? msg : ''

    return { data, hasError, message }
  }

  /**
   * Builds valid user object
   *
   * @param {any} data
   * @returns
   *
   * @memberof AuthService
   */
  buildUser(data) {
    return {
       strUserID:         data.strUserID
      ,strEmail:          data.strEmail
      ,blnEmailVerified:  data.blnEmailVerified
      ,strUsername:       data.strUsername
      ,strAvatar:         data.strAvatar
      ,strYouTube:        data.strYouTube
      ,strTwitter:        data.strTwitter
      ,strFacebook:       data.strFacebook
      ,strBio:            data.strBio
      ,intStatusID:       data.intStatusID
    }
  }

  /**
   * Builds valid thumbnail object
   *
   * @param {any} data
   * @returns {Thumb}
   *
   * @memberof UtilitiesService
   */
  buildThumbnail(data): Thumb {
    let user = this.buildUser(data)
    let category = this.buildCategory(data)
    let image = this.buildImage(data)

    return {
       strTemplateID:               data.strTemplateID
      ,strTemplateTitle:            data.strTemplateTitle
      ,strTemplateAlias:            data.strTemplateAlias
      ,strTemplateDescription:      data.strTemplateDescription
      ,strTemplateKeywords:         data.strTemplateKeywords
      ,strTemplateUploadDate:       data.strTemplateUploadDate
      ,strTemplateDownload:         data.strTemplateDownload
      ,intTemplateSortOrder:        data.intTemplateSortOrder
      ,intTemplateViewCount:        data.intTemplateViewCount
      ,intTemplateLikeCount:        data.intTemplateLikeCount
      ,intTemplateDownloadCount:    data.intTemplateDownloadCount
      ,strTemplateDownloadContents: data.strTemplateDownloadContents
      ,dteTemplateLastUpdatedDate:  data.dteTemplateLastUpdatedDate
      ,dteTemplateReleaseDate:      data.dteTemplateReleaseDate
      ,intTemplateStatusID:         data.intTemplateStatusID
      ,strFontID:                   data.strFontID
      ,strFont:                     data.strFont
      ,strFontDownload:             data.strFontDownload
      ,intFontSortOrder:            data.intFontSortOrder
      ,category:                    category
      ,image:                       image
      ,user:                        user
    }
  }

  /**
   * Builds valid category object
   *
   * @param {any} data
   * @returns {Category}
   *
   * @memberof UtilitiesService
   */
  buildCategory(data): Category {
    return {
       intCategoryID: data.intCategoryID
      ,strCategory:   data.strCategory
    }
  }

  /**
   * Builds valid image object
   *
   * @param {any} data
   * @returns {Image}
   *
   * @memberof UtilitiesService
   */
  buildImage(data): Image {
    return {
       strImageID:          data.strImageID
      ,strImageTitle:       data.strImageTitle
      ,strImageOwner:       data.strImageOwner
      ,strImageAlias:       data.strImageAlias
      ,dteImageUploadDate:  data.dteImageUploadDate
      ,blnIsFeaturedImage:  data.blnIsFeaturedImage
      ,intImageStatusID:    data.intImageStatusID
      ,intImageSortOrder:   data.intImageSortOrder
    }
  }

  /**
   * Creates user account model from Google response data
   * Only use for posting new user to TUsers in database
   *
   * @param {any} user
   * @returns
   *
   * @memberof UtilitiesService
   */
  createUser(user) {
    return {
       strUserID:         this.escapeHtml(this.replaceNullOrUndefined(user.uid))
      ,strEmail:          this.escapeHtml(this.replaceNullOrUndefined(user.email))
      ,blnEmailVerified:  this.escapeHtml(this.replaceNullOrUndefined(user.emailVerified))
      ,strUsername:       this.escapeHtml(this.replaceNullOrUndefined(user.username.trim()))
      ,strYouTube:        this.escapeHtml(this.replaceNullOrUndefined(user.youtube.trim()))
      ,strTwitter:        this.escapeHtml(this.replaceNullOrUndefined(user.twitter.trim()))
      ,strFacebook:       this.escapeHtml(this.replaceNullOrUndefined(user.facebook.trim()))
      ,strBio:            this.escapeHtml(this.replaceNullOrUndefined(user.bio))
    }
  }

  /**
   * Checks string for special characters
   *
   * @param {any} text
   * @returns
   *
   * @memberof UtilitiesService
   */
  hasSpecialChars(text) {
    let compare = this.escapeHtml(text)
    let isValid = text == compare

    return {
      valid: isValid,
      message: "Please remove invalid characters (&, <, >, \", ')"
    }
  }

  /**
   * Checks string for spaces
   *
   * @param {any} text
   * @returns
   *
   * @memberof UtilitiesService
   */
  hasSpaces(text) {
    let isValid = !/\s/.test(text.trim())

    return {
      valid: isValid,
      message: "Please remove all spaces"
    }
  }

  /**
   * Replaces potentially harmful characters with markup code equal
   *
   * @param {any} text
   * @returns
   *
   * @memberof UtilitiesService
   */
  escapeHtml(text) {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
  }

  /**
   * Replaces a null or undefined variable with empty string
   * This is to prevent runtime errors should unexpected data be used
   *
   * @param {any} text
   * @returns
   *
   * @memberof UtilitiesService
   */
  replaceNullOrUndefined(text) {
    return text == null || text == undefined ? '' : text
  }

}
