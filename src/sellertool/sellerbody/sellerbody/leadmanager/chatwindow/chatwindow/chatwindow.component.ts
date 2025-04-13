import { CommonModule } from '@angular/common';
import { Component, input, Input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerservicesService } from '../../../../../../app/sellertool/sellertoolservice/sellerservices.service';

import { timestamp } from 'rxjs';

@Component({
  selector: 'app-chatwindow',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './chatwindow.component.html',
  styleUrl: './chatwindow.component.css'
})
export class ChatwindowComponent {
  
  @Input() sellerId!:string;
  @Input() buyerId!:string;

  messages: any[] = [];
  newMessageText: string = '';

  constructor() {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages(){
  //   if(this.buyerId){
  //     const conversationId  = `${this.sellerId}_${this.buyerId}`;
  //     this.chatService.getMessages(conversationId).subscribe((message)=>{
  //       this.messages = message;
  //     });
  // }
  }

  sendMessage() {
    if(this.newMessageText.trim()){
      const message = {
        senderId: this.buyerId,
        text: this.newMessageText,
        timestamp: new Date().toISOString(),
      }

      // const conversationId  =`${this.sellerId}_${this.buyerId}`;
      // this.chatService.sendMessage(conversationId,message).then(()=>{
      //     this.newMessageText = '';
      // });
    }
  }

}