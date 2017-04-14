import { Component, OnInit,  trigger, transition, style, animate } from '@angular/core';
import { StoreService } from '../shared/store.service';
import { RequestService } from '../shared/request.service';
import { ModalService } from '../shared/modal.service';

@Component({
  selector: 'app-list-processed-files',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(-10px)', opacity: 0}),
          animate('100ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('100ms', style({transform: 'translateY(-10px)', opacity: 0}))
        ])
      ]
    )
  ],
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
    this.storeService.clearUploadServerFiles();
    this.listFiles = this.storeService.getUploadFile();
    this.requestService.getUserListFile().subscribe(files => {
      console.log('file from server ',files)
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
      this.modalService.showModal(link, file);
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
