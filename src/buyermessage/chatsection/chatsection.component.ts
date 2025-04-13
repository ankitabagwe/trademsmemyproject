import { ChangeDetectorRef, Component, Input, SimpleChanges } from '@angular/core';

import { timestamp } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { BuyermessageComponent } from '../buyermessage.component';
import { ChatserviceService } from '../../chatservice.service';
import { MyServiceService } from '../../app/services/my-service.service';
import { CamelCaseToSpacePipe } from '../../camel-case-to-space.pipe';
import { FetchProductService } from '../../app/services/fetchproduct/fetch-product.service';

@Component({
  selector: 'app-chatsection',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,NgFor,BuyermessageComponent,CamelCaseToSpacePipe],
  templateUrl: './chatsection.component.html',
  styleUrl: './chatsection.component.css'
})
export class ChatsectionComponent {

  @Input() conversationId:string ='';
  
  @Input() buyerId: string  | null = '';  

    @Input() sellerName: string = '';
  messages: any[] = [];
  newMessageText: string = '';
  selectedFile : File |null=null;
  sellerdata : any;
  hoverType: string | null = null;
  sellermobile : any;
  location : any;
 

  constructor(private cdr: ChangeDetectorRef,private chatservice:ChatserviceService , private myServiceService : MyServiceService,
    private FetchproductService : FetchProductService) {}
  
  ngOnInit() {
    console.log('Chat Section Loaded with Conversation ID:', this.conversationId);
    this.loadMessages();
    this.getBuyerId();
    console.log(this.conversationId);
   
    this.myServiceService.sellerData$.subscribe(data => {
      this.sellerdata = data;
      this.sellermobile = data.mobilenumber;
      this.location = data.city;
      console.log("Received seller data in ChatsectionComponent:", this.sellerdata);
    });

    this.cdr.detectChanges();
  }

  //get seller data
  // fetchSellerDetails(){
  //   this.FetchproductService.getSellerByMobile(this.mobileNumber).subscribe((data:any)=>{
  //     this.sellerdata = data || {};
  //     console.log(this.sellerdata);
  //   }),
  //   (error:any) => {
  //     console.error("Error fetching seller details:", error);
  //   }
  //     }

  getBuyerId() {
 this.buyerId = this.myServiceService.getMobileNumber();
 console.log(this.buyerId);
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
        senderId: this.buyerId,
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

  showDetails(type: string) {
    this.hoverType = type;
  }
  
  hideDetails() {
    this.hoverType = null;
  }

  formatMessage(text: string): string {
    return text.replace(/\n/g, '<br>'); // Replace new lines with <br> for HTML display
}

}
