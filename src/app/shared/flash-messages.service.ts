import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()
export class FlashMessagesService {
  message: string;
  stream = new Subject();
  constructor() { }

  getStreamMessage(){
    return this.stream;
  }
  getMessage(){
    return this.message;
  }
  removeMessage(){
    this.message = '';
  }
  addMessege(message: string){
    this.message = message;
    this.stream.next({
      msg: message,
      class: 'alert'
    })
    console.log('Update flash message ', this.message)
  }
}
