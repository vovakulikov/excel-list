import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { RequestService } from '../shared/request.service';
import {StoreService} from "../shared/store.service";
import 'rxjs/add/operator/catch';
import { User } from '../shared/interfaces/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService,
              private reqService: RequestService,
              private storeService: StoreService ) {

    this.storeService.clearUploadServerFiles();
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile;
      this.subscribe();
    });
  }

  subscribe(){
    console.log('subscribe init')
    this.reqService.subOnUpdateFiles().subscribe((response) => {
      console.log('Пришли данные', response);
      switch(response.type){
        case "ADD_NEW_FILES": {
          console.log('add_new_files')
          this.storeService.addServerFile(response.documentInfo);
          break;
        }
        case "DELETE_FILE":{
          this.storeService.deleteDocument(response.removedDocument);
          break;
        }
      }
      this.subscribe()
    }, err => {
      console.log('some troble wit update subscribe');
      this.subscribe();
    })
  }

  uploadFile(files){
    this.reqService.uploadUserFiles(files).subscribe( response => {
      if(response.success){
        console.log('Success');
      } else {
        console.log('Fialure');
      }
    });
  }
}
