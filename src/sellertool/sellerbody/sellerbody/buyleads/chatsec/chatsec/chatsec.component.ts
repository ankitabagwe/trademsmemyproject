import { Component, Input, SimpleChanges } from '@angular/core';
import { SellerservicesService } from '../../../../../../app/sellertool/sellertoolservice/sellerservices.service';
import { ChatserviceService } from '../../../../../../chatservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CamelCaseToSpacePipe } from '../../../../../../camel-case-to-space.pipe';

@Component({
  selector: 'app-chatsec',
  standalone: true,
  imports: [CommonModule,FormsModule,CamelCaseToSpacePipe],
  templateUrl: './chatsec.component.html',
  styleUrl: './chatsec.component.css'
})
export class ChatsecComponent {
@Input() conversationId:string ='';
  @Input() sellerId: string = ''; 
  @Input() buyerName: string = '';
  messages: any[] = [];
  newMessageText: string = '';
  selectedFile : File |null=null;
  userData: any;

  constructor(private datatransfer:SellerservicesService,private chatservice:ChatserviceService) {}

  ngOnInit() {
    this.sellerId = this.datatransfer.getData();
    console.log("seller id" + this.sellerId);
    console.log('Chat Section Loaded with Conversation ID:', this.conversationId);
    this.loadMessages();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['conversationId'] && changes['conversationId'].currentValue) {
      console.log('Conversation ID changed:', this.conversationId);
      this.loadMessages();
    }
  }

  loadMessages() {
    // if(this.sellerId){
    //   const conversationId  = `${this.buyerId}_${this.sellerId}`;
    //   // this.chatService.getMessages(conversationId).subscribe((message)=>{
    //   //   this.messages=message;
    //   // });
    // }
    if (!this.conversationId) {
      console.log('No conversation ID provided.');
      return;
    }

    this.chatservice.getMessages(this.conversationId).subscribe(messages => {
      this.messages = messages;
      console.log('Loaded messages:', this.messages);
    });

  }

  onFileselected(event:Event):void{
    const input = event.target as HTMLInputElement; 
    if (input?.files?.length) {
     this.selectedFile = input.files[0];
      console.log('File selected:',  this.selectedFile.name); 
    }
    else{
      console.log( 'No File selected:'); 
    }
  }

  sendMessage() {
    if(this.newMessageText.trim()){
      const message = {
        
        text: this.newMessageText,
        timestamp: new Date().toISOString(),
        senderId: this.sellerId,
        isSent: true
      };

      this.messages.push(message);
        this.newMessageText='';

        // if (!this.buyerId || !this.sellerId) {
        //   console.error('BuyerId or SellerId is undefined');
        //   return;
        // }
    
      const conversationId  =this.conversationId;
      this.chatservice.sendMessage(conversationId,message).subscribe(() => {
        this.newMessageText = '';
      });
      
    }
  }

  formatMessage(text: string): string {
    return text.replace(/\n/g, '<br>'); // Replace new lines with <br> for HTML display
}

}
