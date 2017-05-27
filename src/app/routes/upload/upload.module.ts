import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2UploaderModule } from 'ng2-uploader'
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload/ng2-file-upload'

@NgModule({
  imports: [
    CommonModule,
    Ng2UploaderModule
  ],
  declarations: [
    ThumbnailComponent,
    FileSelectDirective,
    FileDropDirective
  ]
})
export class UploadModule { }
