import { Component } from '@angular/core';
import { SellerservicesService } from '../../../app/sellertool/sellertoolservice/sellerservices.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-frontpage',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink,RouterOutlet,RouterModule],
  templateUrl: './frontpage.component.html',
  styleUrl: './frontpage.component.css'
})
export class FrontpageComponent {
  mobileNumber: string = '';
  otp: string = '';
  showOTPModal: boolean = false;
  
  constructor(private datatransfer:SellerservicesService,private router:Router,private http:HttpClient){}
  
   onStartSelling(): void {
     console.log('Mobile Number:', this.mobileNumber);

     if (!this.mobileNumber || !/^\d{10}$/.test(this.mobileNumber)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
  }
    
     
     this.http.get<boolean>(`${environment.apiBaseUrl}/checkMobileNumber?mobilenumber=${this.mobileNumber}`)
     .subscribe(isRegistered => {
       if (isRegistered) {
         // If the mobile number is registered, navigate to seller body

        //  this.router.navigateByUrl("app-sellerbody/dashboard");
         this.datatransfer.setData(this.mobileNumber);
         this.sendOTP(this.mobileNumber);
        
       } else {
         // If the mobile number is not registered, navigate to business details
         this.datatransfer.setData(this.mobileNumber);
         this.router.navigateByUrl("app-buisnessdetails");
      
       }
     }, error => {
       console.error('Error checking mobile number:', error);
       this.router.navigateByUrl("app-buisnessdetails");
     });
   }

   sendOTP(mobileNumber:string){
         console.log("Sending OTP to:", mobileNumber);
         this.http.get(`${environment.apiBaseUrl}/sendotp/${this.mobileNumber}`, { observe: 'response' })
        .subscribe({
          next: (response: HttpResponse<any>) => {
            if (response.status === 200) {
          
            }
          },
          error: (error) => {
            alert("OTP sent successfully to your registered mail id");
            this.showOTPModal = true;

            console.log("sending mobile number to next page" + this.mobileNumber)
            this.datatransfer.setData(this.mobileNumber);
           
          }
        });
   }

   verifyOTP() {
    if (!this.otp || this.otp.length !== 4) {
   alert("Please enter a valid 6-digit OTP.");
   return;
 }
 const token = localStorage.getItem('authToken');
   this.http.post(`${environment.apiBaseUrl}/verifyotp`, {
     mobileNumber: this.mobileNumber,
     otp: this.otp
   }).subscribe({
     next: (response: any) => {
       if (response.success) {
       
       } else {
         alert("Invalid OTP, please try again.");
       }
     },
     error: (error) => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('mobileNumber', this.mobileNumber);
       alert("OTP verified! Logging in...");
       this.router.navigate(['/app-sellerbody/dashboard']);
      //  this.router.navigateByUrl("app-sellerbody/dashboard");
       this.showOTPModal = false;
     }
   });
 }

 closeOTPModal() {
  this.showOTPModal = false;
}



leadmanager(){
alert("Request you to first Login if not register kindly register yourself");
}

buyleads(){
  alert("Request you to first Login if not register kindly register yourself");
}
products(){
  alert("Request you to first Login if not register kindly register yourself");
}
}
