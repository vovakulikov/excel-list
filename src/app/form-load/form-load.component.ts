import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { RequestService } from '../shared/request.service';
import { StoreService } from '../shared/store.service';

@Component({
  selector: 'app-form-load',
  templateUrl: './form-load.component.html',
  styleUrls: ['./form-load.component.css']
})
export class FormLoadComponent{

  @Output() loadFileHook = new EventEmitter();
  correctFiles: File[];
  uncorrectFiles: File[];
  constructor( private storeService: StoreService ) {

    this.correctFiles = [];
    this.uncorrectFiles = [];
  }

  onSubmit() {
    const files: File[] = this.storeService.getFiles();
    this.loadFileHook.emit(files);
    this.storeService.removePreloadFiles();
  }

  onChange(fileEVT) {
    this.storeService.removePreloadFiles();
    [this.correctFiles, this.uncorrectFiles] = this.storeService.checkGroupFiles(fileEVT);
    this.storeService.addData(this.correctFiles);
  }

}
