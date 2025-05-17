import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FetchProductService } from '../app/services/fetchproduct/fetch-product.service';
import { SellerservicesService } from '../app/sellertool/sellertoolservice/sellerservices.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  sellerData: any = {};
  sellerDataadditional: any = {};
  mobileNumber!: string;

  constructor(private FetchproductService : FetchProductService, private getmob : SellerservicesService,private http:HttpClient){}

  business: any = {
    gstin: '',
    pan: '',
    tan: '',
    cinllpin: '',
    importexportcode: ''
  };

  bank: any = {
    accountnumber: '',
    ifsc: '',
    accountholdername: '',
    branchname: '',
    bankname: ''
  };


  isEditing = false;

  ngOnInit(): void {
    this.getSellerMobile();
  }


  getSellerMobile() {
  this.mobileNumber = this.getmob.getData();
  if (this.mobileNumber) {
      this.fetchSellerDetails();
      this.fetchSellerDetailsadditional();
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


 

  toggleEdit() {
    if (this.isEditing) {
      this.updateSellerData();
    }
    this.isEditing = !this.isEditing;
  }

  fetchSellerDetailsadditional(){

    this.FetchproductService.getSelleradditionalByMobile(this.mobileNumber).subscribe((data: any) => {
      if (data) {
        this.sellerDataadditional = data;
        this.business = {
          gstin: data.gstin || '',
          pan: data.pan || '',
          tan: data.tan || '',
          cinllpin: data.cinllpin || '',
          importexportcode: data.importexportcode || ''
        };
        this.bank = {
          accountnumber: data.accountnumber || '',
          ifsc: data.ifsc || '',
          accountholdername: data.accountholdername || '',
          branchname: data.branchname || '',
          bankname: data.bankname || ''
        };
      }
    }, (error: any) => {
      console.error("Error fetching seller additional details:", error);
    });
    
// this.FetchproductService.getSelleradditionalByMobile(this.mobileNumber).subscribe((data:any)=>{
//   this.sellerDataadditional = data || {};
//   console.log(this.sellerDataadditional);
// }),
// (error:any) => {
//   console.error("Error fetching seller details:", error);
// }
    
  }

  updateSellerData(){
  this.http.put(`${environment.apiBaseUrl}/sellerupdate/${this.sellerData.mobilenumber}`,this.sellerData,{ responseType: 'text' }).subscribe(response => {
    console.log("Seller data updated successfully!", response);
    this.fetchSellerDetails();
  }, error => {
    console.error("Error updating seller data", error);
  });
  }


  toggleEdit1() {
    if (this.isEditing) {
      this.updateBusinessDetailsadditional();
    }
    this.isEditing = !this.isEditing;
  }

  updateBusinessDetailsadditional() {

    const updatedDetails = {
      mobilenumber: this.mobileNumber,
      gstin: this.business.gstin || this.sellerDataadditional.gstin,
      pan: this.business.pan || this.sellerDataadditional.pan,
      tan: this.business.tan || this.sellerDataadditional.tan,
      cinllpin: this.business.cinllpin || this.sellerDataadditional.cinllpin,
      importexportcode: this.business.importexportcode || this.sellerDataadditional.importexportcode,
      accountnumber: this.bank.accountnumber || this.sellerDataadditional.accountnumber,
      ifsc: this.bank.ifsc || this.sellerDataadditional.ifsc,
      accountholdername: this.bank.accountholdername || this.sellerDataadditional.accountholdername,
      branchname: this.bank.branchname || this.sellerDataadditional.branchname,
      bankname: this.bank.bankname || this.sellerDataadditional.bankname
    };
  
    this.http.put(`${environment.apiBaseUrl}/sellerupdateadditional/${this.mobileNumber}`, updatedDetails, { responseType: 'text' }).subscribe(response => {
      console.log("Business details updated successfully!", response);
      this.fetchSellerDetailsadditional();
    }, error => {
      console.error("Error updating business details", error);
    });

    // const updatedDetails = {
    //   mobilenumber: this.mobileNumber,
    //   ...this.business,
    //   ...this.bank
    // };

    // this.http.put(`${environment.apiBaseUrl}/sellerupdateadditional/${this.mobileNumber}`, updatedDetails,{ responseType: 'text' }).subscribe(response => {
    //   console.log("Business details updated successfully!", response);
    // }, error => {
    //   console.error("Error updating business details", error);
    // });
  }
}
