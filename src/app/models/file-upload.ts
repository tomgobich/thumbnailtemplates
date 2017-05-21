export interface UploadProgress {
  status: 'Queue' | 'Uploading' | 'Done' | 'Canceled'; // current status of upload for specific file (Queue | Uploading | Done | Canceled)
  data?: {
    percentage: number; // percentage of upload already completed
    speed: number; // current upload speed per second in bytes
    speedHuman: string; // current upload speed per second in human readable form
  };
}

export interface UploadFile {
  id: string; // unique id of uploaded file instance
  fileIndex: number; // fileIndex in internal ngx-uploader array of files
  lastModifiedDate: Date; // last modify date of the file (Date object)
  name: string; // original name of the file
  size: number; // size of the file in bytes
  type: string; // mime type of the file
  progress: UploadProgress;
  response?: any; // response when upload is done (parsed JSON or string)
}

// output events emitted by ngx-uploader
export interface UploadOutput {
  type: 'addedToQueue' | 'allAddedToQueue' | 'uploading' | 'done' | 'removed' | 'start' | 'cancelled' | 'dragOver' | 'dragOut' | 'drop';
  file?: UploadFile;
}

// input events that user can emit to ngx-uploader
export interface UploadInput {
  type: 'uploadAll' | 'uploadFile' | 'cancel' | 'cancelAll';
  url?: string; // URL to upload file to
  method?: string; // method (POST | PUT)
  id?: string; // unique id of uploaded file
  fieldName?: string; // field name (default 'file')
  fileIndex?: number; // fileIndex in internal ngx-uploader array of files
  file?: UploadFile; // uploading file
  data?: { [key: string]: string | Blob }; // custom data sent with the file
  headers?: { [key: string]: string }; // custom headers
  concurrency?: number; // concurrency of how many files can be uploaded in parallel (default is 0 which means unlimited)
}