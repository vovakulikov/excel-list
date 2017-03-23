import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {

  correctFiles: File[];
  uncorrectFiles: File[];
  uploadedFile: Object[];

  constructor() {
    this.correctFiles = [];
    this.uncorrectFiles = [];
    this.uploadedFile = [];
  }

  checkTypeOfFile(type,file){
    if (!file.name.match(`${type}.*`)) {
      return false;
    }
    return true;
  }
  checkGroupFiles(evt){
    let files = (evt.type == "change") ? evt.target.files : evt.dataTransfer.files;
    let formData:any = new FormData();
    let filesArray = [].slice.call(files);
    let check,uncorrectFiles;

    uncorrectFiles = filesArray.filter((item)=>{
      check = this.checkTypeOfFile('xlsx',item);
      if(check)
        formData.append('uploadFiles',item,item.name);
      return !check;
    });

    return [formData.getAll('uploadFiles'),uncorrectFiles]
  }

  getFiles(){
    return this.correctFiles;
  }
  addData(files:File[]){
    files.forEach((file)=>{
      this.correctFiles.push(file);
    })
  }
  removePreloadFiles(){
    this.correctFiles.splice(0, this.correctFiles.length);
  }
  removeFile(file){
    let index = this.correctFiles.indexOf(file);

    if(index > -1){
      this.correctFiles.splice(index, 1)
    }
  }

  addFiles(files:File[]){
    files.forEach((file:File)=>{
      this.correctFiles.push(file);
    })
  }


  addServerFile(files){
    files.forEach((file:File)=>{
      this.uploadedFile.push(file);
    })
  }
  getUploadFile(){
    return this.uploadedFile;
  }

}
