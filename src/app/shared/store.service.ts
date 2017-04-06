import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {

  correctFiles: File[];
  uncorrectFiles: File[];
  uploadedFile: Object[];

  static checkTypeOfFile(type, file) {
    return !!file.name.match(`${type}.*`);
  }

  constructor() {
    this.correctFiles = [];
    this.uncorrectFiles = [];
    this.uploadedFile = [];
  }
  //validation file, only xslx format;
  checkGroupFiles (evt) {
    const files = (evt.type === 'change') ? evt.target.files : evt.dataTransfer.files;
    const formData: any = new FormData();
    const filesArray = [].slice.call(files);
    const {uncorrectFiles, correctFiles} = this.separateFiles(filesArray);

    correctFiles.forEach((file) => {
      formData.append('uploadFiles', file, file.name);
    });

    return [correctFiles, uncorrectFiles];
  }

  separateFiles(files){
    return files.reduce((store, file) => {
      store.correctFiles = store.correctFiles || [];
      store.uncorrectFiles = store.uncorrectFiles || [];

      if (StoreService.checkTypeOfFile('xlsx', file)) {
        store.correctFiles.push(file);
      } else {
        store.uncorrectFiles.push(file);
      }
      return store;
    }, {});
  }


  //methods to working for file which select to download to server
  getFiles() {
    return this.correctFiles;
  }

  addData(files: File[]) {
    files.forEach(file => {
      this.correctFiles.push(file);
    });
  }

  removePreloadFiles() {
    this.correctFiles.splice(0, this.correctFiles.length);
  }

  removeFile(file) {
    const index = this.correctFiles.indexOf(file);

    if (index > -1) {
      this.correctFiles.splice(index, 1);
    }
  }



  //list of file which already uploaded.
  addServerFile(files) {
    console.log('Add a new files  ',files)
    files.forEach((file: File) => {
      this.uploadedFile.push(file);
    });
  }
  clearUploadServerFiles(){
    this.uploadedFile.splice(0, this.uploadedFile.length);
  }
  getUploadFile() {
    return this.uploadedFile;
  }

}
