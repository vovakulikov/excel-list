import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { RequestService } from '../shared/request.service';
import {StoreService} from "../shared/store.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;

  constructor(private authService: AuthService,
              private reqService: RequestService,
              private storeService: StoreService ) {

    this.storeService.clearUploadServerFiles();
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile;
      this.subscribe();
    }, err => {
      console.log('error happand')
      setTimeout(()=>{
        this.subscribe();
      }, 1000)
    });
  }

  subscribe(){
    console.log('subscribe init')
    this.reqService.subOnUpdateFiles().subscribe((newFiles) => {
      console.log('Пришли данные', newFiles);
      this.storeService.addServerFile(newFiles.documentInfo);
      this.subscribe()
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
