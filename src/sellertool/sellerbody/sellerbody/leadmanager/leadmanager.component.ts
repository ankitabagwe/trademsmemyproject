import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChatlistComponent } from './chatlist/chatlist/chatlist.component';
import { ChatwindowComponent } from './chatwindow/chatwindow/chatwindow.component';
import { SellerservicesService } from '../../../../app/sellertool/sellertoolservice/sellerservices.service';

@Component({
  selector: 'app-leadmanager',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,ChatlistComponent,ChatwindowComponent],
  templateUrl: './leadmanager.component.html',
  styleUrl: './leadmanager.component.css'
})
export class LeadmanagerComponent {

  sellerId : string = '';
  selectedBuyerId : string ='';

    constructor(private myServiceService : SellerservicesService){}
    ngOnInit(): void {
      const mobileNumber = this.myServiceService.getData();
      if (mobileNumber) {
        this.sellerId = mobileNumber; // Assign the mobile number if available
      } else {
        console.error('seller ID is null or undefined.');
      }
    }

    onBuyerSelect(BuyerId:string){
      this.selectedBuyerId = BuyerId;
    }
 
//   searchControl = new FormControl('');
//   selectedChat: any;
//   selectedConversationId!: string;
//   onConversationSelected(conversationId: string) {
//     this.selectedConversationId = conversationId;
//   }

// onChatSelected(chat: any) {
//   this.selectedChat = chat;
// }
}
