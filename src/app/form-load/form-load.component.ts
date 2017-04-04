import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { RequestService } from '../shared/request.service';
import { StoreService } from '../shared/store.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-form-load',
  templateUrl: './form-load.component.html',
  styleUrls: ['./form-load.component.css']
})
export class FormLoadComponent implements OnInit {
  @Output() loadFileHook = new EventEmitter();
  correctFiles: File[];
  uncorrectFiles: File[];
  constructor( private requestService: RequestService,
               private storeService: StoreService ) {

    this.correctFiles = [];
    this.uncorrectFiles = [];
  }

  ngOnInit() {}

  onSubmit(evt) {
    const files: File[] = this.storeService.getFiles();
    this.loadFileHook.emit(files);
    this.storeService.removePreloadFiles();
  }

  onChange(fileInput) {
    this.storeService.removePreloadFiles();
    [this.correctFiles, this.uncorrectFiles] = this.storeService.checkGroupFiles(fileInput);
    this.storeService.addData(this.correctFiles);
  }

}
