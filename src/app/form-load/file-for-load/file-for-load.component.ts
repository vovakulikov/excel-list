import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../shared/store.service';

@Component({
  selector: 'app-file-for-load',
  templateUrl: 'file-for-load.component.html',
  styleUrls: ['file-for-load.component.css']
})
export class FileForLoadComponent implements OnInit {

  fileForLoad: File[];
  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.fileForLoad = this.storeService.getFiles();
    console.log(this.fileForLoad)
  }

  delete(event){
    this.storeService.removeFile(event);
  }

}
