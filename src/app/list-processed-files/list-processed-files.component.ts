import { Component, OnInit } from '@angular/core';


import { StoreService } from '../shared/store.service';
import { HelperService } from '../shared/helper.service';
@Component({
  selector: 'app-list-processed-files',
  templateUrl: './list-processed-files.component.html',
  styleUrls: ['./list-processed-files.component.css']
})
export class ListProcessedFilesComponent implements OnInit {


  listFiles: Object[];

  constructor(private helperService: HelperService,private storeService: StoreService) {
    this.listFiles = [];
  }

  ngOnInit() {
    this.listFiles = this.storeService.getUploadFile();
    this.helperService.getData()
      .then((data)=>{
          console.log(data, typeof data);
          let arrayData = data;
          this.storeService.addServerFile(arrayData);


      });
  }

  download(fileInform){
    this.helperService.askADownload(fileInform);
    console.log('Должны скачать вот этот файл из сервера', fileInform);
  }

}
