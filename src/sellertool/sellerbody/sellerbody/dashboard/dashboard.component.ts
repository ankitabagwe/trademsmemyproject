import { Component } from '@angular/core';
import { FetchProductService } from '../../../../app/services/fetchproduct/fetch-product.service';
import { SellerservicesService } from '../../../../app/sellertool/sellertoolservice/sellerservices.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  mobileNumber!: string;
  sellerData: any = {};
constructor(private router:Router,private FetchproductService : FetchProductService, private getmob : SellerservicesService,private http:HttpClient){}
ngOnInit(): void {
  this.getSellerMobile();
}

getSellerMobile() {
  this.mobileNumber = this.getmob.getData();
  if (this.mobileNumber) {
    this.fetchSellerDetails();
    
  } else {
    console.error("Mobile number not available in getmob service.");
  }
}


fetchSellerDetails(){
  this.FetchproductService.getSellerByMobile(this.mobileNumber).subscribe((data:any)=>{
    this.sellerData = data || {};
    console.log(this.sellerData);
  }),
  (error:any) => {
    console.error("Error fetching seller details:", error);
  }
    }

  
    gotoprod(){
      this.router.navigateByUrl("app-sellerbody/products");
    }
}
