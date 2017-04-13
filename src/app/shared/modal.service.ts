import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ModalService {
  stream = new Subject();
  constructor() { }

  getStream(){
    return this.stream;
  }

  showModal(link){
    this.stream.next(link);
  }
}
