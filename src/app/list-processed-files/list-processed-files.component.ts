import { Component, OnInit } from '@angular/core';


import { StoreService } from '../shared/store.service';
import { RequestService } from '../shared/request.service';

@Component({
  selector: 'app-list-processed-files',
  templateUrl: './list-processed-files.component.html',
  styleUrls: ['./list-processed-files.component.css']
})
export class ListProcessedFilesComponent implements OnInit {


  listFiles: Object[];

  constructor(private requestService: RequestService,private storeService: StoreService) {
    this.listFiles = [];
  }

  ngOnInit() {
    this.listFiles = this.storeService.getUploadFile();
    this.requestService.getData()
      .then((data)=>{
          this.storeService.addServerFile(data);
      });
  }

  download(fileInform){
    this.requestService.askADownload(fileInform);
  }

}
