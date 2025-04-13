import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { MyServiceService } from '../../app/services/my-service.service';

import { CommonModule, NgFor } from '@angular/common';
import { BuyermessageComponent } from '../buyermessage.component';
import { ChatserviceService } from '../../chatservice.service';
import { CamelCaseToSpacePipe } from '../../camel-case-to-space.pipe';
import { FetchProductService } from '../../app/services/fetchproduct/fetch-product.service';

@Component({
  selector: 'app-chatlist',
  standalone: true,
  imports: [CommonModule,NgFor,BuyermessageComponent,CamelCaseToSpacePipe],
  templateUrl: './chatlist.component.html',
  styleUrl: './chatlist.component.css'
})
export class ChatlistComponent {
  
 @Input()  buyerId: string  | null = '';
//  @Input() buyerId: string = "8828437637"; 
 @Output() selectSeller= new EventEmitter<{ conversationId: string, sellerName: string }>();
 
  conversations: any[] = [];
userdata : any;
sellerdata : any;
  constructor(private myservice: MyServiceService,private chatservice:ChatserviceService,
     private FetchproductService : FetchProductService
  ) {}
  ngOnInit() {
    this.getBuyerId();
    this.loadConversations();
  
  }

  getBuyerId() {
    const mobileNumber = this.myservice.getMobileNumber();
    console.log(mobileNumber + "from chatlist");
    if (mobileNumber) {
      this.buyerId = mobileNumber;
    } else {
      console.error('Error: Mobile number is null');
    }
     }

  loadConversations() {
 
    if (!this.buyerId) {
      console.error("Buyer ID is missing, cannot fetch conversations.");
      return;
    }
    this.chatservice.getConversations(this.buyerId).subscribe((data) => {
      this.conversations = data.sort((a: any, b: any) => b.timestamp - a.timestamp);
      this.conversations.forEach(conversation => {
        const sellerNumber = conversation.id.split('_')[1];  
        this.fetchUser(sellerNumber, conversation);
      });
    })

    

  }

  onSellerSelect(convo: any) : void{
    this.selectSeller.emit({
      conversationId: convo.id,
      sellerName: convo.sellerName || 'Unknown'
    });
  }

  fetchUser(sellerNumber: string, conversation: any) {


    this.FetchproductService.getSellerByMobile(sellerNumber).subscribe((data:any)=>{
        conversation.sellerName = data.companydetails || {};
        this.sellerdata = data;
          console.log(data);
          this.myservice.setSellerData(this.sellerdata);
        }),
        (error:any) => {
          console.error("Error fetching seller details:", error);
        }
  }



}
