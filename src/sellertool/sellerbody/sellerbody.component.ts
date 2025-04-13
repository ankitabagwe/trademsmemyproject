import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SellerservicesService } from '../../app/sellertool/sellertoolservice/sellerservices.service';
import { FetchProductService } from '../../app/services/fetchproduct/fetch-product.service';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-sellerbody',
  standalone: true,
  imports: [CommonModule,NavbarComponent,RouterModule],

  templateUrl: './sellerbody.component.html',
  styleUrl: './sellerbody.component.css'
})
export class SellerbodyComponent {
  inquiries: any[] = [];
  sellerMobileNumber: string = '';
  selectedOption: string = 'dashboard';
  buyersData: any[] = [];

  constructor(private http: HttpClient,private router: Router,private service:SellerservicesService,private fetchbuyleads:FetchProductService) { }

  ngOnInit(): void {

this.gotoleadmanager();
   
// this.sellerMobileNumber = this.service.getData();
// this.service.getSellerInquiries(this.sellerMobileNumber).subscribe(
//   (response) => {
//     this.inquiries = response;
//     console.log(response);
//   },
//   (error) => {
//     console.error('Error fetching inquiries:', error);
//   }
// );



// //buyleads
// this.fetchbuyleads.response$.subscribe((data) => {
//   if (data) {
//     this.buyersData = data.buyers;  // Assuming 'buyers' is part of the response
//     console.log('Buyers Data in Seller Body:', this.buyersData);
//   }
// });
  }

  gotoleadmanager(){
    // this.router.navigateByUrl("app-sellermessage");
  }
}
