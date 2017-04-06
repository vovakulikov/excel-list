import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { RequestService } from '../shared/request.service';
import {StoreService} from "../shared/store.service";
import * as io from 'socket.io-client'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;
  socket: any;
  constructor(private authService: AuthService,
              private reqService: RequestService,
              private storeService: StoreService ) {
    this.storeService.clearUploadServerFiles();
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile;

      this.socket.on(this.user['email'],(data) => {
        console.log('Из сокета ',data);
        this.storeService.addServerFile(data.data);
      })

    });
    this.socket = io.connect('localhost:3000',{
      extraHeaders: {
        Authorization: localStorage.getItem('id_token')
      }
    });

  }
  ngOnDestroy(){

  }
  uploadFile(files){
    this.reqService.uploadUserFiles(files).subscribe(uploadedFile => {
      //this.storeService.addServerFile(uploadedFile.data);
    });

  }

}
