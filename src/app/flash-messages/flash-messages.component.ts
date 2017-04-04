import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from '../shared/flash-messages.service';




@Component({
  selector: 'app-flash-messages',
  templateUrl: './flash-messages.component.html',
  styleUrls: ['./flash-messages.component.css']
})
export class FlashMessagesComponent implements OnInit {

  stream: any;
  message: string;
  constructor(private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.message = this.flashMessage.getMessage();
    this.stream = this.flashMessage.getStreamMessage();

    this.stream.subscribe( message => {
      this.message = message.msg;
      console.log('Console from subscribe component')
    })
  }
  ngOnDestroy(){
    this.message = '';
  }

}
