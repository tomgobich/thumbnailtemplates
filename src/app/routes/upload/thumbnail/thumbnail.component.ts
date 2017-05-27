import { Directive, Component, EventEmitter } from '@angular/core';
import { FileUploader, FileSelectDirective, FileDropDirective } from 'ng2-file-upload'
import { environment } from '../../../../environments/environment'

@Component({
  selector: 'app-upload',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
@Directive({ selector: '[ng2FileSelect]'})
export class ThumbnailComponent {

  public uploader: FileUploader = new FileUploader({url: environment.imageUploadUrl});
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  fileNames: Array<string> = []
  uploadStatus: string
  successMsg: string = "You're file(s) have successfully uploaded"
  failureMsg: string = "An unexpected error occured, please try again"

  constructor() {
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.fileNames = []
      var data = JSON.parse(response)
      this.uploadStatus = data.status ? this.successMsg : this.failureMsg
      this.fileNames.push(data.generatedName)
      console.log({fileNames: this.fileNames})
    }
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

}
