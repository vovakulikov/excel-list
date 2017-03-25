import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-file-item',
  templateUrl: 'file-item.component.html',
  styleUrls: ['file-item.component.css']
})
export class FileItemComponent implements OnInit {
  @Input() file: File;
  @Output() deleteFile = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onDelete() {
    this.deleteFile.emit(this.file);
  }

}
