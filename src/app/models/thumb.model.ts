import { User } from './user.model'
import { Category } from './category.model'
import { Image } from './image.model'

export interface Thumb {
  strTemplateID: string
  strTemplateTitle: string
  strTemplateAlias: string
  strTemplateDescription: string
  strTemplateKeywords: string
  strTemplateUploadDate: string
  strTemplateDownload: string
  intTemplateDownloadCount: number
  intTemplateSortOrder: string
  intTemplateViewCount: string
  intTemplateLikeCount: number
  strTemplateDownloadContents: string
  dteTemplateLastUpdatedDate: Date
  dteTemplateReleaseDate: Date
  intTemplateStatusID: number
  strFontID: string
  strFont: string
  strFontDownload: string
  intFontSortOrder: number
  category: Category
  image: Image
  user: User
}
