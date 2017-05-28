import { User } from './user.model'
import { Category } from './category.model'
import { Image } from './image.model'

export interface Thumb {
  strTemplateID: String
  strTemplateTitle: String
  strTemplateAlias: String
  strTemplateDescription: String
  strTemplateKeywords: String
  strTemplateUploadDate: String
  strTemplateDownload: String
  intTemplateDownloadCount: Number
  intTemplateSortOrder: String
  intTemplateViewCount: String
  intTemplateLikeCount: Number
  strTemplateDownloadContents: String
  dteTemplateLastUpdatedDate: Date
  dteTemplateReleaseDate: Date
  intTemplateStatusID: Number
  strFontID: String
  strFont: String
  strFontDownload: String
  intFontSortOrder: Number
  category: Category
  image: Image
  user: User
}
