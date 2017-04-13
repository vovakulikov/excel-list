import { Component, OnInit } from '@angular/core';
import { StoreService } from '../shared/store.service';
import { RequestService } from '../shared/request.service';
import { ModalService } from '../shared/modal.service';

@Component({
  selector: 'app-list-processed-files',
  templateUrl: './list-processed-files.component.html',
  styleUrls: ['./list-processed-files.component.css']
})
export class ListProcessedFilesComponent implements OnInit {

  listFiles: Object[];

  constructor(private requestService: RequestService,
              private storeService: StoreService,
              private modalService: ModalService) {
    this.listFiles = [];
  }

  ngOnInit() {
    this.listFiles = this.storeService.getUploadFile();
    this.requestService.getUserListFile().subscribe(files => {
      this.storeService.addServerFile(files);
    })
  }

  download(fileInform) {
    this.requestService.downloadUserFile(fileInform);
  }

  getShareLink(file){
    //console.log('Catch emit event in list-proccesed component', file);
    this.requestService.getShareLink(file).subscribe( link => {
      console.log(link);
      this.modalService.showModal(link)
    })
  }

  deleteDocument(document){
    console.log('req to delete some file', document);
    this.requestService.deleteDocument(document).subscribe((responce) => {
      console.log(responce)
      if(responce.success) {
        //this.storeService.deleteDocument(document);
      }
    })
  }
}
