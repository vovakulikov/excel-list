import { Injectable } from '@angular/core';


@Injectable()
export class HelperService {

  constructor() { }
  logg(fileInput){
    console.log('Это было выведено из сервиса', fileInput);
  };

  checkTypeOfFile(type,file){

    if (!file.name.match(`${type}.*`)) {
      return false;
    }
    return true;
  }

  checkGroupFiles(evt){

    let files = (evt.type == "change") ? evt.target.files : evt.dataTransfer.files;
    let formData:any = new FormData();

    let filesArray = [].slice.call(files)
    let uncorrectFiles = filesArray.filter((item)=>{
      let check = this.checkTypeOfFile('xlsx',item);
      if(check)
        formData.append('uploadFiles',item,item.name);
      return !check;
    })
    console.log('From formData, correct files',formData.getAll('uploadFiles'));
    console.log('Uncorrect files', uncorrectFiles)

    return [formData.getAll('uploadFiles'),uncorrectFiles]
  }
  _Submit(files:[File]){
    console.log('Нажали кнопку отправкли, ждем ответа от сервера',files)

    this.makeFileRequest('http://localhost:3000/api/upload',[],files)
      .then((result) => {
          console.log(result);
        }, (error) => {
          console.log(error);
        });


  }
  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for(var i = 0; i < files.length; i++) {
        formData.append("uploads", files[i], files[i].name);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open("POST", url, true);
      xhr.send(formData);
    });
  }
}
