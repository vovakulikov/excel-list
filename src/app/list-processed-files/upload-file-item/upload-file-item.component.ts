import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-file-item',
  templateUrl: 'upload-file-item.component.html',
  styleUrls: ['upload-file-item.component.css']
})
export class UploadFileItemComponent {

  @Input() file: Object;
  @Output() download = new EventEmitter();

  constructor() { }

  onDownload() {
    this.download.emit(this.file);
  }
}
