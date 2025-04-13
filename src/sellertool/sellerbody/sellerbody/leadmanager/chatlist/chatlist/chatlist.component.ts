import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SellerservicesService } from '../../../../../../app/sellertool/sellertoolservice/sellerservices.service';

@Component({
  selector: 'app-chatlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chatlist.component.html',
  styleUrl: './chatlist.component.css'
})
export class ChatlistComponent {
 
 @Input() sellerId!: string ;
 @Output() selectBuyer = new EventEmitter<string>();

 conversations: any[] = [];

 constructor(private myServiceService : SellerservicesService){}

 ngOnInit() {
this.loadConversations();
}

loadConversations() {
  // if (this.sellerId) {
  //   this.chatService.getConversations(this.sellerId).subscribe((data)=>{
  //     this.conversations=data;
  //   });
  // }
  // else {
  //   console.error('Buyer ID is not provided.');
  // }
}

onBuyerSelect(buyerId:string) : void{
  this.selectBuyer.emit(String(buyerId))
}

}
