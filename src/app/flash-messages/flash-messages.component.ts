import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from '../shared/flash-messages.service';

@Component({
  selector: 'app-flash-messages',
  templateUrl: './flash-messages.component.html',
  styleUrls: ['./flash-messages.component.css']
})
export class FlashMessagesComponent {
  stream: any;
  message: string;
  typeClass: string;

  constructor(private flashMessage: FlashMessagesService) {
    this.stream = this.flashMessage.getStreamMessage();
    [this.message, this.typeClass] = this.flashMessage.getMessage();

    this.stream.subscribe(Modal => {
      this.message = Modal.message;
      this.typeClass = Modal.type;
    });
  }

  ngOnInit() {
    // i'm alone unnecessary method
  }

  ngOnDestroy(){
    this.flashMessage.removeMessage();
  }
}
