import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  uploadFile: any
  hasBaseDropZoneOver: boolean = false
  sizeLimit = 2000000
  options: Object = {
    url: 'http://localhost:8080/upload.php'
  }

  constructor() { }

  ngOnInit() {
  }

  handleUpload(data) {
    if (data && data.response) {
      data = JSON.parse(data.response)
      this.uploadFile = data
    }
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e
  }

  beforeUpload(uploadingFile) {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort()
      alert('File is too large!')
    }
  }

}
