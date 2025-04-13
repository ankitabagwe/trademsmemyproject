import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MyServiceService } from '../../app/services/my-service.service';
import { ChatserviceService } from '../../chatservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SellerservicesService } from '../../app/sellertool/sellertoolservice/sellerservices.service';
import { CamelCaseToSpacePipe } from '../../camel-case-to-space.pipe';

@Component({
  selector: 'app-chatlist',
  standalone: true,
  imports: [CommonModule,FormsModule,CamelCaseToSpacePipe],
  templateUrl: './chatlist.component.html',
  styleUrl: './chatlist.component.css'
})
export class ChatlistComponent {
@Input() sellerId: string = ''; 
 @Output() selectBuyer= new EventEmitter<{conversationId:string,buyerName:string}>();
 conversations: any[] = [];
 userData: any;

  constructor(private datatransfer:SellerservicesService,private chatservice:ChatserviceService) {}
  ngOnInit() {
    this.sellerId = this.datatransfer.getData();
 console.log("seller id" + this.sellerId);
    this.loadConversations();
  }

  loadConversations() {
 
    this.chatservice.getConversations(this.sellerId).subscribe((data)=>{
      this.conversations = data.filter((conversation: any) => !conversation.id.includes('_buyleads')) // Exclude 'buyleads'
      .sort((a: any, b: any) => b.timestamp - a.timestamp);

      this.conversations.forEach(conversation => {
        const buyerNumber = conversation.id.split('_')[0];
        console.log(buyerNumber);
        this.fetchUser(buyerNumber,conversation);
      })
    })
  }


  onBuyerSelect(convo: any) : void{
   
    this.selectBuyer.emit({
      conversationId : convo.id,
      buyerName : convo.buyerName || 'Unknown'
    });
  }

  fetchUser(buyerNumber:string,conversation:any) {
    this.chatservice.getUserDetailsByMobileNumber(buyerNumber).subscribe({
      next: (data) => {
        conversation.buyerName = data.name;
       
      },
      error: (err) => {
        conversation.buyerName = 'Unknown';
        
      }
    });
  }

  



}
