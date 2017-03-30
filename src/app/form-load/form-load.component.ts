import { Component, OnInit } from '@angular/core';
import { RequestService } from '../shared/request.service';
import { StoreService } from '../shared/store.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-form-load',
  templateUrl: './form-load.component.html',
  styleUrls: ['./form-load.component.css']
})
export class FormLoadComponent implements OnInit {
  correctFiles: File[];
  uncorrectFiles: File[];

  constructor(private requestService: RequestService, private storeService: StoreService ) {
    this.correctFiles = [];
    this.uncorrectFiles = [];
  }
  ngOnInit() {}

  onSubmit(evt) {
    console.log(evt)
    const files: File[] = this.storeService.getFiles();
    this.requestService.uploadFiles(files)
      .subscribe((dataFile:Response) => {
        console.log(dataFile.json());
        this.storeService.addServerFile(dataFile.json());
      })
    /*this.requestService._Submit(files)
      .then((files: Object[]) => {
          this.storeService.addServerFile(files);
      });*/
    this.storeService.removePreloadFiles();
  }

  onChange(fileInput) {
    this.storeService.removePreloadFiles();
    [this.correctFiles, this.uncorrectFiles] = this.storeService.checkGroupFiles(fileInput);
    this.storeService.addData(this.correctFiles);
  }

}
