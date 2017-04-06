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

      this.socket.on(this.user['email'],(documents) => {
        console.log('Из сокета ',documents);
        this.storeService.addServerFile(documents.documentInfo);
      })

    });
    this.socket = io.connect('localhost:3000',{
      extraHeaders: {
        Authorization: localStorage.getItem('id_token')
      }
    });

  }
  uploadFile(files){
    this.reqService.uploadUserFiles(files).subscribe(uploadedFile => {
      //this.storeService.addServerFile(uploadedFile.data);
      //Раньше здесь добавлялись ответы полсе обработки файлов.
      //Сейчас используется socket io.
      //Позже этот запрос будет работать на socket io
    });

  }

}
