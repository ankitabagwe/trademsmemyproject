import { Component } from '@angular/core';
import { MyServiceService } from '../../app/services/my-service.service';
import { CommonModule, NgIf } from '@angular/common';
import { ChatlistComponent } from '../chatlist/chatlist.component';
import { ChatsectionComponent } from '../chatsection/chatsection.component';
import { SellerservicesService } from '../../app/sellertool/sellertoolservice/sellerservices.service';

@Component({
  selector: 'app-sellermessage',
  standalone: true,
  imports: [ChatlistComponent,ChatsectionComponent,CommonModule,NgIf],
  templateUrl: './sellermessage.component.html',
  styleUrl: './sellermessage.component.css'
})
export class SellermessageComponent {
 sellerId: string = "";  

 selectedConversationId: string = '';
 selectedbuyerName: string = '';

  constructor(private datatransfer:SellerservicesService){}

  ngOnInit(): void {
 this.sellerId = this.datatransfer.getData();
 console.log("seller id" + this.sellerId);
  }
  onBuyerSelect(eventData: { conversationId: string; buyerName: string }) {
    this.selectedConversationId = eventData.conversationId;
    this.selectedbuyerName = eventData.buyerName;
  }
}
