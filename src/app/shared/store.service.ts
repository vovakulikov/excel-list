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
    let uncorrectFiles = filesArray.filter((item)=>{
      let check = this.checkTypeOfFile('xlsx',item);
      if(check)
        formData.append('uploadFiles',item,item.name);
      return !check;
    });
    //[this.correctFiles,this.uncorrectFiles] = [formData.getAll('uploadFiles'),uncorrectFiles];
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
  removeAll(){
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
    console.log('Загруженные файлы после обновления',this.uploadedFile)
  }

  getUploadFile(){
    return this.uploadedFile;
  }

}
