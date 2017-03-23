import { Injectable } from '@angular/core';
import * as FileSaver from "file-saver";


@Injectable()
export class RequestService {
  constructor() { }

  _Submit(files:File[]){
    return this.makeRequest('http://localhost:3000/api/upload',{
      method: 'POST'
    },files)
      .then((result) => {
          console.log(result);
          return Promise.resolve(result);
        }, (error) => {
          console.log(error);
        });
  }
  askADownload(file){
    this.makeDownloadRequest(`http://localhost:3000/api/download/${file.fileName}`,'GET')
      .then((buffer) => {
        const blob = new Blob([buffer], {});

        FileSaver.saveAs(blob, file.fileName);
      })
  }
  getData(){
    return this.makeRequest('http://localhost:3000/api/docs',{
      method: 'GET'
    },[]);
  }
  makeDownloadRequest(url:string, method:string){
    console.log('Запустили MakeDownload')
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.open(method, url, true);
      xhr.responseType = "arraybuffer";

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(xhr.response)
          }
        }
      }

      xhr.send();
    })
  }

  makeRequest(url: string, params, files: File[]) {
    return new Promise((resolve, reject) => {
      const formData: FormData = new FormData();
      const xhr = new XMLHttpRequest();

      for(let i = 0; i < files.length; i++) {
        formData.append("uploads", files[i], files[i].name);
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }

      xhr.open(params.method, url, true);
      xhr.send(formData);
    });
  }
}
