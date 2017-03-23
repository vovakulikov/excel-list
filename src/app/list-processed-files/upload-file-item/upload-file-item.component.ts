import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-file-item',
  templateUrl: 'upload-file-item.component.html',
  styleUrls: ['upload-file-item.component.css']
})
export class UploadFileItemComponent implements OnInit {
  @Input() file: Object;
  @Output() download = new EventEmitter()
  constructor() { }

  ngOnInit() {
  }
  onDownload(){
    this.download.emit(this.file);
  }
}
