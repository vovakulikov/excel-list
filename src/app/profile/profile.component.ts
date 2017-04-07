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
  socket: any;
  constructor(private authService: AuthService,
              private reqService: RequestService,
              private storeService: StoreService ) {

    this.storeService.clearUploadServerFiles();
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile;
    });

  }
  uploadFile(files){
    this.reqService.uploadUserFiles(files).subscribe(uploadedFile => {
      this.storeService.addServerFile(uploadedFile.documentInfo);
      //Раньше здесь добавлялись ответы полсе обработки файлов.
      //Сейчас используется socket io.
      //Позже этот запрос будет работать на socket io
    });

  }

}
