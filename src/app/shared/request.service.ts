import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';

import { Http, Headers, ResponseContentType }   from '@angular/http';

// todo: rewrite using Angular's services in @angular/http
// todo: https://scotch.io/tutorials/angular-2-http-requests-with-observables

@Injectable()
export class RequestService {
  address: string;
  constructor(private http: Http) {
    this.address = 'http://localhost:3000';
  }

  getListFiles(){
      const currentAdress = this.address + '/api/docs'
      return this.http.get(currentAdress);
  }

  uploadFiles(files: File[]){
    const currentAddress = this.address+ '/api/upload';
    const formData: FormData = new FormData();

    files.forEach((file) => {
      formData.append('uploads', file, file.name);
    })

    return this.http.post(currentAddress, formData);
  }

  downloadFile(file){
    const currentAddress = this.address + `/api/download/${file.fileName}`

    this.http.get(currentAddress, {
      responseType: ResponseContentType.Blob,
      headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
    })
      .subscribe((response) => {
        let blob = new Blob([response.blob()], {});

        FileSaver.saveAs(blob, file.fileName);
      })
  }

}
