import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserFile } from '../../shared/interfaces/User-file';
@Component({
  selector: 'app-upload-file-item',
  templateUrl: 'upload-file-item.component.html',
  styleUrls: ['upload-file-item.component.css']
})
export class UploadFileItemComponent {

  @Input() file: UserFile;
  @Output() download = new EventEmitter();
  @Output() getShareLink = new EventEmitter();
  @Output() deleteDocument = new EventEmitter();

  constructor() { }

  onDownload() {
    this.download.emit(this.file);
  }

  clickOnName(evt){
    evt.stopPropagation();
    console.log('Click on name req to server for shareLink');
    this.getShareLink.emit(this.file);
  }

  deleteDoc(evt){
    evt.stopPropagation();
    this.deleteDocument.emit(this.file);
  }
}
