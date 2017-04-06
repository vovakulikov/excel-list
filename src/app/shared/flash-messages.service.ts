import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()
export class FlashMessagesService {
  message: string;
  type: string;
  stream = new Subject();
  constructor() {
    this.message = '';
    this.type = '';
  }

  getStreamMessage(){
    return this.stream;
  }
  getMessage(){
    return [this.message, this.type]
  }
  removeMessage(){
    this.message = '';
    this.type = '';
  }
  addMessege(Res){
    this.message = Res.message;
    this.type = Res.type;
    this.stream.next(Res);
  }
}
