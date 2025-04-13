import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BodyComponent } from './body/body/body.component'; 
// import { SellerComponent } from './sellertool/seller/seller.component';
import { HomebodyComponent } from '../homebody/homebody.component';
import { SellerbodyComponent } from '../sellertool/sellerbody/sellerbody.component';
import { ProductdetailsComponent } from '../sellertool/productdetails/productdetails.component';
import { BuisnessdetailsComponent } from '../sellertool/buisnessdetails/buisnessdetails.component';
import { BuyerompoComponent } from '../buyer/buyerompo/buyerompo.component';
// import { WithoutregistrationComponent, WithregistrationComponent } from '../withregistration/withregistration.component';
import { SignuppageComponent } from '../signuppage/signuppage.component';
import { BuyerregistrationComponent } from '../buyerregistration/buyerregistration.component';
import { CommonModule, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select'; 
import { FormBuilder,FormGroup } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IndiancitiesService } from '../services/api/indiancities.service';
import { FetchProductService } from './services/fetchproduct/fetch-product.service';
import { query } from '@angular/animations';
import { FootercomponentComponent } from '../footer/footercomponent/footercomponent.component';
import { AddgstComponent } from '../sellertool/addgst/addgst.component';
import { WithregistrationComponent } from '../withregistration/withregistration.component';
import { FrontpageComponent } from '../sellertool/frontpageseller/frontpage/frontpage.component';
import { LeadmanagerComponent } from '../sellertool/sellerbody/sellerbody/leadmanager/leadmanager.component';
import { ChatsectionComponent } from '../buyermessage/chatsection/chatsection.component';
import { BuyermessageComponent } from '../buyermessage/buyermessage.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { initializeApp } from '@angular/fire/app';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FontAwesomeModule ,BuyermessageComponent,LeadmanagerComponent,FrontpageComponent,SignuppageComponent,BuisnessdetailsComponent,BodyComponent,BuyerregistrationComponent,NgIf  ,
    SignuppageComponent, BuyerompoComponent,RouterOutlet,RouterLink,WithregistrationComponent,
    BodyComponent,HomebodyComponent,SellerbodyComponent,AddgstComponent,SellerbodyComponent,
    ProductdetailsComponent,AngularFireAuthModule ,
    NgSelectModule,BodyComponent,ReactiveFormsModule,NgIf,CommonModule,FootercomponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my_project';

  // firebaseConfig = {
  //   apiKey: "AIzaSyB6h6rtopYa1WkQywriFFpciPaYBCea5yA",
  //   authDomain: "indiamartchat-b4b82.firebaseapp.com",
  //   databaseURL: "https://indiamartchat-b4b82-default-rtdb.firebaseio.com",
  //   projectId: "indiamartchat-b4b82",
  //   storageBucket: "indiamartchat-b4b82.firebasestorage.app",
  //   messagingSenderId: "164068011908",
  //   appId: "1:164068011908:web:ddb7c9ebabf0816fe477d1",
  //   measurementId: "G-BXZQ67QMLK"
  // };

  // app = initializeApp(this.firebaseConfig);

  enteredSearchValue: string = '';
  //autocomplete
  
  // This will hold the cities data
  cities: any[] = [];

  // To manage form submission status
  isSubmitted = false;

  // Reactive Form instance
  frm!: FormGroup;

  // Toggle for showing dropdown
  showTextbox = false;


  products : any[] = [];


  constructor(
    private fb: FormBuilder,
    private cityservice: IndiancitiesService, // Injecting the service
    private productservice:FetchProductService
  ) {}

  ngOnInit(): void {
    // Initializing the form group
    this.frm = this.fb.group({
      cities: [] // Define the control for the city dropdown
    });

    // Loading cities from API
    this.loadCities();

  }


  


      searchProducts(query: string): void {

        const city = this.frm.value.cities || null;
        this.productservice.getProducts(query,city).subscribe(
          (data) => {
            this.products = data; // Store the search results
            console.log('Search results:', data);
          },
          (error) => {
            console.error('Error fetching search results', error);
          }
        );
      }



  // Method to load cities data from the API
  loadCities(): void {
    this.cityservice.getCities().subscribe({
      next: (data) => {
        // Assign the fetched data to the cities array
        this.cities = data;
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
}



