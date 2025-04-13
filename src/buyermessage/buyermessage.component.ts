import { Component, Input } from '@angular/core';
import { ChatsectionComponent } from './chatsection/chatsection.component';
import { ChatlistComponent } from './chatlist/chatlist.component';
import { MyServiceService } from '../app/services/my-service.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-buyermessage',
  standalone: true,
  imports: [ChatsectionComponent,ChatlistComponent,CommonModule,NgIf],
  templateUrl: './buyermessage.component.html',
  styleUrl: './buyermessage.component.css'
})
export class BuyermessageComponent {
  // @Input() buyerId: string = ''; // Example buyer contact number
  // @Input()  selectedSellerId!: string;      // Selected seller

  buyerId: string = ''; // Example buyer contact number
  //  selectedSellerId: string = "9876543210";  

   selectedConversationId: string = '';
   selectedSellerName: string = '';

  constructor(private myServiceService : MyServiceService){}

  ngOnInit(): void {
  const mobileNumber = this.myServiceService.getMobileNumber();
  console.log(mobileNumber);
    if (mobileNumber) {
      this.buyerId = mobileNumber; // Assign the mobile number if available
    } else {
      console.error('Buyer ID is null or undefined.');
    }
  }
  onSellerSelect(eventData: { conversationId: string; sellerName: string }) {
    this.selectedConversationId = eventData.conversationId;
    this.selectedSellerName = eventData.sellerName;
  }
}
