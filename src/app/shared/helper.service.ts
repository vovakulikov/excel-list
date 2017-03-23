import { Injectable } from '@angular/core';
import * as FileSaver from "file-saver";

@Injectable()
export class HelperService {

  constructor() { }


  _Submit(files){
    console.log('Нажали кнопку отправкли, ждем ответа от сервера',files)
    return this.makeFileRequest('http://localhost:3000/api/upload',{
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
    this.request(`http://localhost:3000/api/download/${file.fileName}`,'GET')
    /*return this.makeFileRequest(`http://localhost:3000/api/download/${file.fileName}`,{
      method: 'GET'
    },[]);*/
  }
  getData(){
    console.log('Попросили у сервера данные')
    return this.makeFileRequest('http://localhost:3000/api/docs',{
      method: 'GET'
    },[]);
  }
  request(url,method){
    var BlobBuilder = window.Blob;

    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.responseType = "blob";

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          console.log('Ответ от сервера по запросу на файл',xhr.response)

          //var blob = new Blob([xhr.response], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
          /*console.log(blob)
          var reader = new FileReader();
          console.log(reader.readAsArrayBuffer(blob))*/
          FileSaver.saveAs(xhr.response, "export.xls");


          var reader = new FileReader();
          console.log(reader.readAsArrayBuffer(xhr.response))
        } else {}
      }
    }

    xhr.send();
  }
  makeFileRequest(url: string, params, files) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for(var i = 0; i < files.length; i++) {
        formData.append("uploads", files[i], files[i].name);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            console.log(xhr.response)
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
