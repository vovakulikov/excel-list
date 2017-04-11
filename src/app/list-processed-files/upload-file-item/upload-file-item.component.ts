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

  constructor() { }

  onDownload() {
    this.download.emit(this.file);
  }
}
