import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import 'rxjs/add/operator/map';
import { Http, Headers, ResponseContentType } from '@angular/http';
import { UserFile } from './interfaces/User-file';

@Injectable()
export class RequestService {
  address: string;
  constructor(private http: Http) {
    this.address = 'http://localhost:3000';
  }

  uploadUserFiles(files: File[]){
    const currentAddress = this.address + '/users/upload-user-file';
    const formData: FormData = new FormData();
    const headers = new Headers();

    headers.append('Authorization',localStorage.getItem('id_token'));
    files.forEach((file) => {
      formData.append('uploads', file, file.name);
    });

    return this.http.post(currentAddress, formData, {
      headers: headers
    }).map(res => res.json());
  }

  subOnUpdateFiles(){
    const currentAdress = this.address + '/users/subscribe-update-files';
    const headers = new Headers();

    headers.append('Authorization',localStorage.getItem('id_token'));
    return this.http.get(currentAdress, {
      headers: headers
    }).map(res => {
      return res.json();
    })
  }

  getUserListFile(){
    const currentAdress = this.address + '/users/docs';
    const headers = new Headers();

    headers.append('Authorization',localStorage.getItem('id_token'));
    return this.http.get(currentAdress, {
      headers: headers
    }).map(res => res.json());
  }

  downloadUserFile(file: UserFile){
    const currentAddress = this.address + `/users/download-user-file/${file.fileName}`;

    this.http.get(currentAddress, {
      responseType: ResponseContentType.Blob,
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('id_token')})
    })
      .subscribe((response) => {
        const blob = new Blob([response.blob()], {});
        FileSaver.saveAs(blob, file.fileName);
      });
  }

}
