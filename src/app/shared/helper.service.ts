import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

  constructor() { }
  logg(fileInput){
    console.log('Это было выведено из сервиса', fileInput);
  };


  fileSelect(evt){
    let path = (evt.type == "change") ? evt.target.files : evt.dataTransfer.files
    return new Promise((resolve,reject) => {
      var files = path
      //Пройдемся по массиву с файлами
      // если файл не имеет формат изображения, то выброс
      let f = files[0];
      if (!f.type.match('image.*')) {
        reject('Error, this is not correct type of file')

      }
      //Создаем новый ридер для чтение файла изображение.
      let reader = new FileReader();
      //Читаем файл в виде dataUrl
      reader.readAsDataURL(f);
      //Загрузка файла
      reader.onload = function(e){
        // console.log('Thats is eeeee', e)
          resolve({file:f})
      };
    })
  }
}
