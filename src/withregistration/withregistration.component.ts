import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import bootstrap, { Modal } from 'bootstrap';

import { FootercomponentComponent } from '../footer/footercomponent/footercomponent.component';
import { BodyComponent } from '../app/body/body/body.component';
import { FetchProductService } from '../app/services/fetchproduct/fetch-product.service';
import { HttpClient } from '@angular/common/http';
import { IndiancitiesService } from '../services/api/indiancities.service';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { UserdataService } from '../app/services/postuserdata/userdata.service';
import { Observable } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { MyServiceService } from '../app/services/my-service.service';
import { FrontpageComponent } from '../sellertool/frontpageseller/frontpage/frontpage.component';
import { SellerservicesService } from '../app/sellertool/sellertoolservice/sellerservices.service';
import { ChatserviceService } from '../chatservice.service';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-withregistration',
  standalone: true,
  imports: [FrontpageComponent,FormsModule,BodyComponent,FootercomponentComponent,RouterLink,RouterOutlet, FormsModule,CommonModule ,
    ReactiveFormsModule,NgIf,NgSelectModule,RouterModule,FontAwesomeModule ],
  templateUrl: './withregistration.component.html',
  styleUrl: './withregistration.component.css'
})
export class WithregistrationComponent {
  enteredSearchValue: string = '';
  cities: any[] = [];
  isSubmitted = false;
  frm!: FormGroup;
  showTextbox = false;
  products : any[] = [];
  showModal = false;
  mobileNumber: string | null = null;
  soldby: any[] = [];;

  selectedProduct: any = null;
  units: any[] = [
    "Kilogram (kg)", "Gram (g)", "Ton (t)", "Litre (L)", "Millilitre (mL)","Roll", "Box", "Carton", "Pack", "Bundle", "Bag", "Envelope", "Sheet", "Piece",
     "Barrel", "Canister", "Bottle", "Vial",
    "Ampere (A)", "Volt (V)", "Watt (W)", "Set", "Unit", "Kilowatt (kW)", "Milliwatt (mW)", "Kilovolt (kV)",
    "Gigawatt (GW)", "MWh", "Horsepower (hp)", "Pound (lb)", "Metric Ton (MT)", "Cubic Meter (m³)",
    "Square Meter (m²)", "Square Foot (ft²)", "Cubic Foot (ft³)", "Ream", "Square Yard (yd²)", "Yard (yd)",
    "Dozen (dz)", "Meter (m)", "Foot (ft)", "Inch (in)", "Millimeter (mm)", "Centimeter (cm)", "Quintal",
    "Bale", "Bundle", "Bushel", "Acre", "Hectare (ha)", "Vial", "Tablet", "Syringe", "Drum", "Canister", "Micron",
    "Bigha", "Katha", "Cattle", "Head"
  ];
  formData = {
    quantity: '',
    unit:'',
    requirementDetails: '',
    gstNumber: ''
  };
  
  isDropdownOpen = false; // Tracks if dropdown is visible
  isUnitOpen = false;
  newMessageText: string = '';
  faYoutube = faYoutube;
  faFilePdf = faFilePdf;


  toggle(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log('Dropdown state:', this.isDropdownOpen); // Debug log
  }

  toggleDropdownunit(){
this.isUnitOpen = !this.isUnitOpen;
  }

  buyerName: string | null = null;
  constructor(private cdr: ChangeDetectorRef ,private service:FetchProductService, private chatservice:ChatserviceService,private http:HttpClient, private fb: FormBuilder,
    private cityservice: IndiancitiesService,  private myServiceService : MyServiceService,private buyleadsservice:SellerservicesService, // Injecting the service
    private productservice:FetchProductService,private router:Router,private userdataservice:UserdataService) {
      
    }

    ngOnInit(): void {

      const isLoggedIn = localStorage.getItem('isLoggedIn');
      console.log(isLoggedIn);
      this.loadCities();
      this.loadRandomProducts();
       // Initializing the form group
       this.frm = this.fb.group({
        cities: [] // Define the control for the city dropdown
      });
  
    
    this.mobileNumber= this.myServiceService.getMobileNumber();
    console.log(this.mobileNumber);
  
    this.http
          .get<any>(`http://localhost:8081/details/${this.mobileNumber}`)
          .subscribe(
            (response) => {
              this.buyerName = response.name;
              console.log('Fetched buyer details:', response);
            },
            (error) => {
              console.error('Error fetching buyer details:', error);
            }
          );


    }



    openYouTube(youtubelink:string) {
      if (youtubelink) {
        window.open(youtubelink, '_blank');
      }
    }
  
    openPDF(pdffile:string) {
      if (pdffile) {
        window.open(pdffile, '_blank');
      }
    }

      selectUnit(unit: string): void {
    // Append the selected unit to the quantity input
    this.formData.unit=unit;
    if (this.formData.quantity) {
      this.formData.quantity += ` ${unit}`;
    } else {
      this.formData.quantity = unit;
    }

    this.isUnitOpen = false;
  }
   

//gotoseller

gotoseller(){
  this.router.navigateByUrl("app-frontpage");
  console.log("seller");
}

gotomessages(){
  this.router.navigateByUrl("app-buyermessage");
  console.log("inside messages");
}


  onGetPrice(product:any) {
  this.selectedProduct = product;
  
  this.productservice.getSellerByMobile(product.mobilenumber).subscribe(
    (sellerName:any) => {
      this.soldby = sellerName.companydetails;
      console.log(this.soldby);
    },
    (error) => {
      console.error('Seller not found', error);
      this.selectedProduct.soldBy = 'Unknown';
    }
  );


  const modalElement = document.getElementById('productDetailsModal');
  if (modalElement) {
    const myModal = new Modal(modalElement);  // Initialize the Bootstrap modal
    myModal.show();  // Show the modal
  }


  }


  submitForm() {

    let modalElement = document.getElementById('productDetailsModal');
    if (modalElement) {
      (modalElement as HTMLElement).classList.remove('show');
      modalElement.setAttribute('aria-hidden', 'true');
      modalElement.style.display = 'none';
  
      // Remove backdrop
      let backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    }
   
    const data = {
      ...this.formData,
      userMobileNumber: this.mobileNumber,  // Attach logged-in user's mobile number
      productName: this.selectedProduct.productname, 
    
      
    };

    const numericQuantity = parseFloat(this.formData.quantity.split(' ')[0]);
    console.log("numericQuantity" + numericQuantity);
    const priceString = this.selectedProduct.price;
    const numericPrice = parseFloat(priceString.replace(/[^\d.]/g, ''));
    console.log("selected price" + this.selectedProduct.price);
    console.log("numeric price" + numericPrice);
    const probableOrderValue = numericQuantity * numericPrice;
console.log("probableOrderValue" + probableOrderValue);
    const chatmessage = {
      senderId: this.mobileNumber,
      receiverId: this.selectedProduct.mobilenumber,
     
      
      text : `I viewed your product, ${this.selectedProduct.productname}\n
              Kindly send me price and other details.\n        
              Probable Order value : ${probableOrderValue}\n
              Quantity : ${numericQuantity}\n
              Quantity Unit : ${this.formData.unit}\n
              Requirement : ${this.formData.requirementDetails}\n
              
              Contact Number:- ${this.mobileNumber}
              
              `,
      timestamp: Date.now(),
    }
    console.log(chatmessage);
    




   const conversationId = `${chatmessage.senderId}_${chatmessage.receiverId}`;
   this.chatservice.sendMessage(conversationId,chatmessage).subscribe({next: () => {
    this.newMessageText = '';
    console.log("Message sent successfully, now calling sendMessagesToBuyleads...");
    // this.sendMessagesToBuyleads(this.products, this.selectedProduct);
},
error: (error) => {
    console.error("Error sending message:", error);
}
   });

   
  }


  searchProducts(productname: string): void {

    const city = this.frm.value.cities || null;
    console.log(city);
    this.productservice.getProducts(productname,city).subscribe(
      (data) => {
        this.products = data; // Store the search results
        this.cdr.detectChanges(); 
        console.log('Search results:', data);
        if (data.length > 0) {
          this.sendMessagesToBuyleads(data,this.selectedProduct);
        }
      },
      (error) => {
        console.error('Error fetching search results', error);
      }
    );
  }

  sendMessagesToBuyleads(products: any[],selectedProduct: any): void {

    console.log("Sending messages to buyleads...");
    const buyerIdforbuyleads = this.mobileNumber;
    console.log("Buyer ID:", buyerIdforbuyleads);

    const sellerIds: string[] = []; // Array to store all seller numbers
    const numericQuantity = parseFloat(this.formData.quantity.split(' ')[0]);
    const probableOrderValue = numericQuantity * selectedProduct.price;
    const productname = selectedProduct.productname;
    const unit = this.formData.unit;
    const requirementDetails = this.formData.requirementDetails;
    products.forEach((product, index) => {
        console.log(`Processing product ${index}:`, product); // Log full product for debugging
        
        if (product.mobilenumber) {
            sellerIds.push(product.mobilenumber); // Store seller number
        } else {
            console.warn(`Product at index ${index} has no mobileNumber`, product);
        }
    });

    console.log("All Seller IDs:", sellerIds.join(", "));

    products.forEach((product,index) => {
      
      const sellerId = product.mobilenumber; // Ensure your product data includes sellerId
      console.log("seller ID:", sellerId);
      const buyerproductName = product.name;
      
      if(sellerId){
       

    const chatmessage = {
      senderId:buyerIdforbuyleads,
      receiverId:sellerId,
      text: `I viewed your product, ${productname}
              Kindly send me price and other details.            
              Probable Order value : ${probableOrderValue}
              Quantity : ${numericQuantity}
              Quantity Unit : ${unit}
              Requirement : ${requirementDetails}
              __________________________________________________
              Mobile Number : ${this.mobileNumber}
              Company Name : ${buyerproductName}
              
              `,
              timestamp: Date.now(),
    };
    const conversationId = `${buyerIdforbuyleads}_${sellerId}_buyleads`;
    console.log("Conversation ID:", conversationId);
    console.log("Chat Message:", chatmessage);
    
    this.chatservice.sendMessage(conversationId, chatmessage).subscribe({
      next: (response) => {
        console.log(`Buy lead sent to seller ${sellerId}`, response);
      },
      error: (err) => {
        console.error(`Error sending buy lead to ${sellerId}`, err);
      }
    });
  }
});
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
        console.log(this.products);
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

 //logout

 logout(){
  

  console.log('inside logout');
    // ✅ Clear login status
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('mobileNumber');
    localStorage.clear();
  
    this.mobileNumber = '';
  
  
    // ✅ Redirect to `withoutreg`
    this.router.navigateByUrl("");
    console.log('After logout:', localStorage);
 }



}
