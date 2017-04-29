import { User } from './user.model'
import { Image } from './image.model'

export class Thumb {
  strTemplateID: string
  strTemplateTitle: string
  strTemplateAlias: string
  strTemplateDescription: string
  strTemplateKeywords: string
  strTemplateUploadDate: string
  strTemplateDownload: string
  intTemplateDownloadCount: number
  intTemplateSortOrder: number
  intTemplateViewCount: number
  strTemplateDownloadContents: string
  dteTemplateLastUpdatedDate: string
  dteTemplateReleaseDate: string
  intTemplateStatusID: number
  intCategoryID: number
  strCategory: string
  strFontID: string
  strFont: string
  strFontDownload: string
  intFontSortOrder: number
  image: Image
  user: User
}
