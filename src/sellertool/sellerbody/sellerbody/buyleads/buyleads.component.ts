import { Component } from '@angular/core';
import { ChatlistComponent } from './chatlist/chatlist/chatlist.component';
import { ChatsecComponent } from './chatsec/chatsec/chatsec.component';
import { SellerservicesService } from '../../../../app/sellertool/sellertoolservice/sellerservices.service';

@Component({
  selector: 'app-buyleads',
  standalone: true,
  imports: [ChatlistComponent,ChatsecComponent],
  templateUrl: './buyleads.component.html',
  styleUrl: './buyleads.component.css'
})
export class BuyleadsComponent {
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
