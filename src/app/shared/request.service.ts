import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import 'rxjs/add/operator/map';
import { Http, Headers, ResponseContentType } from '@angular/http';
import { UserFile } from './interfaces/User-file';

@Injectable()
export class RequestService {
  address: string;
  headers: Headers;
  constructor(private http: Http) {
    this.address = 'http://localhost:3000';
    this.headers  = new Headers();
    this.headers.append('Authorization',localStorage.getItem('id_token'));

  }

  uploadUserFiles(files: File[]){
    const currentAddress = this.address + '/users/upload-user-file';
    const formData: FormData = new FormData();

    files.forEach((file) => {
      formData.append('uploads', file, file.name);
    });

    return this.http.post(currentAddress, formData, {
      headers: this.headers
    }).map(res => res.json());
  }

  getShareLink(file){
    const currentAdress = this.address + '/users/share-file/'+file.fileName;

    return this.http.get(currentAdress, {
      headers: this.headers
    }).map(res => {
      return res.json();
    })
  }
  deleteDocument(document) {
    const currentAdress = this.address + '/users/delete-file/'+document.fileName;

    return this.http.delete(currentAdress, {
      headers: this.headers
    }).map(res => {
      return res.json();
    })
  }
  subOnUpdateFiles(){
    const currentAdress = this.address + '/users/subscribe-update-files';

    return this.http.get(currentAdress, {
      headers: this.headers
    }).map(res => {
      return res.json();
    })
  }

  getUserListFile(){
    const currentAdress = this.address + '/users/docs';

    return this.http.get(currentAdress, {
      headers: this.headers
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
