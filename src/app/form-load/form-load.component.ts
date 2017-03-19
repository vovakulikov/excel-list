import { Component, OnInit } from '@angular/core';

import { HelperService } from '../shared/helper.service';

@Component({
  selector: 'app-form-load',
  templateUrl: './form-load.component.html',
  styleUrls: ['./form-load.component.css']
})
export class FormLoadComponent implements OnInit {
  correctFiles:[File];
  uncorrectFiles:[File];

  constructor(private helpService: HelperService){}

  ngOnInit() {}

  onSubmit(evt){
    this.helpService._Submit(this.correctFiles);
    //console.log('Нажали на кнопку отправки и вот наше событие ', evt);
  }
  onChange(fileInput:any){
    let r = new Promise((resolve,reject)=>{});
    console.log(r);

    [this.correctFiles,this.uncorrectFiles] = this.helpService.checkGroupFiles(fileInput);
    console.log(this.correctFiles,this.uncorrectFiles)
    //this.helpService.checkGroupFiles(fileInput)
    //this.helpService.logg(fileInput)
    //console.log('changing form',fileInput)
  }
}
