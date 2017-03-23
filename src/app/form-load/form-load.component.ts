import { Component, OnInit } from '@angular/core';

import { RequestService } from '../shared/request.service';

import { StoreService } from '../shared/store.service';


@Component({
  selector: 'app-form-load',
  templateUrl: './form-load.component.html',
  styleUrls: ['./form-load.component.css']
})
export class FormLoadComponent implements OnInit {
  correctFiles: File[];
  uncorrectFiles: File[];

  constructor(private requestService: RequestService,private storeService: StoreService ){
    this.correctFiles = [];
    this.uncorrectFiles = [];
  }
  ngOnInit() {}

  onSubmit(evt){
    let files = this.storeService.getFiles();
    this.requestService._Submit(files)
      .then((files)=>{
          console.log('Данные пришедшие после отравки данных на сервер',files)
          this.storeService.addServerFile(files);
      })
    this.storeService.removeAll();
  }
  onChange(fileInput){
    this.storeService.removeAll();
    [this.correctFiles,this.uncorrectFiles] = this.storeService.checkGroupFiles(fileInput);
    this.storeService.addData(this.correctFiles);
    console.log('Тащим из сервиса только что пришедшие даннцые',this.storeService.getFiles())
  }
  onClickGetData(){
    this.requestService.getData();
  }
}
