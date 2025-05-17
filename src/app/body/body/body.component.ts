import { Component, inject } from '@angular/core';
import { FetchProductService } from '../../services/fetchproduct/fetch-product.service';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, window } from 'rxjs';
import { IndiancitiesService } from '../../../services/api/indiancities.service';
import { NgSelectModule } from '@ng-select/ng-select';
import bootstrap, { Modal } from 'bootstrap';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { UserdataService } from '../../services/postuserdata/userdata.service';
import { MyServiceService } from '../../services/my-service.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AuthserviceService } from '../../services/authservice.service';
import {Auth, getAuth, RecaptchaVerifier} from '@angular/fire/auth';
import { initializeApp } from '@angular/fire/app';

import { signInWithPhoneNumber } from '@angular/fire/auth';
import  firebase from '@angular/fire';
import { FirebaseApp } from '@angular/fire/app';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-body',
  standalone: true,
  imports: [RouterLink,AngularFireAuthModule ,RouterOutlet , FormsModule,CommonModule ,ReactiveFormsModule,NgIf,NgSelectModule,RouterModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})


export class BodyComponent {
  
  enteredSearchValue: string = '';
  cities: any[] = [];
  // To manage form submission status
  isSubmitted = false;
  // Reactive Form instance
  frm!: FormGroup;
  // Toggle for showing dropdown
  showTextbox = false;
  products : any[] = [];
  showModal = false;
  mobileNumber :string = '';

  buyerName: string | null = null;

  isDropdownOpen = false;
  otp: string = '';
  showSignInModal: boolean = false;
  showOTPModal: boolean = false;
  

   


  toggle(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log('Dropdown state:', this.isDropdownOpen); // Debug log
  }
  gotoseller(){
    this.router.navigateByUrl("app-frontpage");
    console.log("seller");
  }
  constructor(private service:FetchProductService, private http:HttpClient, private fb: FormBuilder,
    private myServiceService : MyServiceService,
    private cityservice: IndiancitiesService, // Injecting the service
    private productservice:FetchProductService,private router:Router,private userdataservice:UserdataService,
    ) {
     }

     ngOnInit(): void {

      this.loadCities();
      this.loadRandomProducts();
       // Initializing the form group
       this.frm = this.fb.group({
        cities: [] // Define the control for the city dropdown
      });

    }
  
    onGetPrice(event?: Event) { 
      if (event) {
        event.stopPropagation();  // Prevent event bubbling inside *ngFor
      }
      this.showSignInModal = true;
  }


  login(mobileNumber: string) {
    if (!mobileNumber || mobileNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    this.http.get<any>(`${environment.apiBaseUrl}/details/${this.mobileNumber}`).subscribe(
            (response) => {
              if (response && response.token) {
               
              }
              this.mobileNumber = response.mobilenumber;
              console.log('Fetched buyer details:', response);
              console.log('User exists, sending OTP...');
              this.sendOTP(this.mobileNumber);
            },
            (error) => {
              if (error.status === 401) {
                console.log('User not found. Redirecting to buyer registration...');
                // Navigate to buyer registration
              } else {
                console.error('Unexpected error occurred:', error.message);
              }
              console.error('Error fetching buyer details:', error);
              this.router.navigateByUrl("app-buyerregistration");
            }
          );
      
       
  
    }
  
    sendOTP(mobileNumber: string) {
      console.log("Sending OTP to:", mobileNumber);
      // this.myServiceService.setMobileNumber(this.mobileNumber); //testing
      // this.router.navigateByUrl("app-withregistration"); //testing
      this.http.get(`${environment.apiBaseUrl}/send-otp/${this.mobileNumber}`, { observe: 'response' })
        .subscribe({
          next: (response: HttpResponse<any>) => {
            if (response.status === 200) {
          
            }
          },
          error: (error) => {
            alert("OTP sent successfully to your registered mail id!");
            this.showSignInModal = false;
            this.showOTPModal = true;

            console.log("sending mobile number to next page" + this.mobileNumber)
            this.myServiceService.setMobileNumber(this.mobileNumber);
           
          }
        });
    }


    verifyOTP() {
       if (!this.otp || this.otp.length !== 4) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }
    console.log(this.otp);
    const token = localStorage.getItem('authToken');
      this.http.post(`${environment.apiBaseUrl}/verify-otp`, {
        mobileNumber: this.mobileNumber,
        otp: this.otp
      }).subscribe({
        next: (response: any) => {
          console.log("inside verify otp");
          if (response.success) {
          
          } else {
            alert("Invalid OTP, please try again.");
          }
        },
        error: (error) => {
          alert("OTP verified! Logging in...");
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('mobileNumber', this.mobileNumber);
          this.router.navigateByUrl("app-withregistration");
          this.showOTPModal = false;
        }
      });
    }


    closeSignInModal() {
      this.showSignInModal = false;
    }
  
    closeOTPModal() {
      this.showOTPModal = false;
    }



    // navigatetosignuppage(){
    //   const modalElement = document.getElementById('signInModal');
    //   if (modalElement) {
    //     const myModal = new Modal(modalElement);  // Initialize the Bootstrap modal
    //     myModal.show();  // Show the modal
    //   }
    // }

//  //this is for firebase auth
//  initializeRecaptcha():void{
 
//  const auth = getAuth();
 
//   this.recaptchaVerifier = new RecaptchaVerifier(
//     auth,
//     'recaptcha-container',
//     {
//       size : 'invisible',
//       callback : (response:any)=>{
//         console.log('reCAPTCHA solved automatically:', response);
//       },
//       'expired-callback': () => {
        
//         console.log('reCAPTCHA expired, please refresh.');
//       },
//     },
  
//   );

//   this.recaptchaVerifier.render().then((widgetId)=>{
//     console.log('reCAPTCHA rendered with ID:', widgetId);
//   });
//  }


 
 

  // verifyOtp(){
  //   this.confirmationResult.confirm(this.otp).then((result:any)=>{
  //     const user = result.user;
  //     console.log(user);
  //   }).catch((error:any)=>{
  //     console.error('Error while verifying OTP:', error);
  //   })
  // }

  submitPhoneNumber() {
    if (this.phoneNumber.length === 10) {
      // Handle phone number submission logic here
      console.log('Phone Number Submitted:', this.phoneNumber);
    } else {
      alert('Please enter a valid 10-digit mobile number');
    }
  }



 
  hideToggle(event: Event){
    // If you want to add extra logic, you can check the event target here.
    this.showSignInModal = false;
  }
  

  searchProducts(productname: string): void {

    const city = this.frm.value.cities || null;
    this.productservice.getProducts(productname,city).subscribe(
      (data) => {
        this.products = data; // Store the search results
        console.log('Search results:', data);
      },
      (error) => {
        console.error('Error fetching search results', error);
      }
    );
  }





  //load cites
  loadCities(): void {
    this.cityservice.getCities().subscribe({
      next: (data) => {
        // Assign the fetched data to the cities array
        this.cities = data.cities;
        console.log('Cities data:', this.cities); // Debugging to check data
      },
      error: (error) => {
        console.error('Error fetching cities', error); // Handle error
      }
    });
  }


  // Method for form submission
  onPost(): void {
    this.isSubmitted = true;
  }

  // Toggle the visibility of the dropdown
  toggleDropdown(): void {
    this.showTextbox = !this.showTextbox;
  }

  // Method to handle search button click
  getData(input: string): void {
    this.enteredSearchValue = input;
    alert(this.enteredSearchValue); // Log input value to console
  }


  loadRandomProducts(): void {
    this.service.getRandomProducts(5).subscribe(
      (data) => {
        this.products = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching random products', error);
      }
    );
  }


  //from withoutreg
  toggledrpdwn = false;
  phoneNumber: string = '';
  getdrpdwn(){
    this.toggledrpdwn = !this.toggledrpdwn;
  }

  openModal() {
    const modalElement = document.getElementById('signInModal');  // Grab the modal by its ID
    if (modalElement) {
      const myModal = new Modal(modalElement);  // Initialize the Bootstrap modal
      myModal.show();  // Show the modal
    }
  }



 
}


 //1) handeling login logic
  // login(mobileNumber: string) {
  //   this.http.post('${environment.apiBaseUrl}/loginn', {mobileNumber}, { responseType: 'text',withCredentials: true }).subscribe(
  //     (response) => {
  //       // console.log('Login successful' + response);
  //       this.service.setLoginStatus(true); // Update login status
  //       this.myServiceService.setMobileNumber(mobileNumber);
  //       this.router.navigateByUrl("app-withregistration");
  //     },
  //     (error) => {
  //       if (error.status === 401) {
  //         console.log('User not found. Redirecting to buyer registration...');
  //         this.router.navigateByUrl("app-buyerregistration"); // Navigate to buyer registration
  //       } else {
  //         console.error('Unexpected error occurred:', error.message);
  //       }
  //     }
  //   );

  // }
//     const appverifier = this.recaptchaVerifier;
    
//     const auth = getAuth();
//     // const mobileno = this.myServiceService.getMobileNumber();
//     signInWithPhoneNumber(auth,mobileNumber,appverifier).then((Result)=>{
//       this.confirmationResult = Result;
//     }).catch((error) => {
//       console.log(error);
//     });