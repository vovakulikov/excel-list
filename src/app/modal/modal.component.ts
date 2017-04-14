import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalService } from '../shared/modal.service';
import { FlashMessagesService } from '../shared/flash-messages.service';
import { UserFile } from '../shared/interfaces/User-file';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['../shared/css/controlls.css', './modal.component.css']
})
export class ModalComponent implements OnInit {
  stream;
  stateShow: Boolean =  false;
  linkInput: string;
  file: UserFile;

  @ViewChild('shareInput') inputOne: ElementRef;

  constructor( private modalService: ModalService,
               private flashMessage: FlashMessagesService) {

    this.stream = this.modalService.getStream();
    this.stream.subscribe( (details) => {
      this.stateShow = true;
      this.file = details.file;
      this.linkInput = 'http://localhost:3000'+details.link.path;
    })
  }

  ngOnInit() {}

  closeModal(){
    this.stateShow = false;
  }

  copyLink(evt){
    evt.stopPropagation();
    const inputElem = <HTMLInputElement>this.inputOne.nativeElement;

    inputElem.select();
    document.execCommand('copy');
    this.flashMessage.addMessege({
      message: 'Link copiled!',
      type: 'link-copilied'
    });

  }

}
