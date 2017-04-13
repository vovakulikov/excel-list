import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalService } from '../shared/modal.service';
import { FlashMessagesService } from '../shared/flash-messages.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css', '../shared/css/controlls.css']
})
export class ModalComponent implements OnInit {
  stream;
  stateShow: Boolean =  false;
  linkInput = 'hello';
  @ViewChild('shareInput') inputOne: ElementRef;

  constructor( private modalService: ModalService,
               private flashMessage: FlashMessagesService) {

    this.stream = this.modalService.getStream();
    this.stream.subscribe( link => {
      this.stateShow = true;
      this.linkInput = 'http://localhost:3000'+link.path;
    })
  }

  ngOnInit() {}

  closeModal(){
    this.stateShow = false;
  }

  copyLink(evt){
    evt.stopPropagation();
    const inputElem = <HTMLInputElement>this.inputOne.nativeElement;
    console.log(inputElem);
    inputElem.select();
    document.execCommand('copy');
    this.flashMessage.addMessege({
      message: 'Link copiled!',
      type: 'link-copilied'
    });

  }

}
