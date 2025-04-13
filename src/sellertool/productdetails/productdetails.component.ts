import { ChangeDetectorRef, Component, QueryList, viewChild, ViewChildren } from '@angular/core';
import { ProductserviceService } from './productdetailsservice/productservice.service';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { SellerservicesService } from '../../app/sellertool/sellertoolservice/sellerservices.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../sellerbody/navbar/navbar.component';
import { ChatserviceService } from '../../chatservice.service';
import { faCamera, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FetchProductService } from '../../app/services/fetchproduct/fetch-product.service';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [FontAwesomeModule ,RouterLink,NavbarComponent,FormsModule,RouterOutlet,RouterModule,CommonModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})

export class ProductdetailsComponent {
   
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef | null = null;
  @ViewChild('pdfInput') pdfInput!: ElementRef;

  url: string = 'addphoto.png'; // Default placeholder image
  selectedFile: File | null = null;
  youtubeLink: string = '';
  pdfFile: File | null = null;
  pdfFileName: string = '';
  productName: string = '';
  Price: string = '';
  showVideoInput = false;
  shippingOption: string = 'included'; 
  taxOption: string = 'included'; 
  productdescription: string = '';
  fileBase64: string | null = null; // Base64 string for the file
  PdfBase64: string | null = null; 
  mobilenumber: string = '';
  sellerDetails : any;
  isYouTubeAttached = false;
  isPDFAttached = false;
  readonly MAX_PDF_SIZE = 1 * 1024 * 1024; 

  faCamera = faCamera;
  faYoutube = faYoutube;
  faFilePdf = faFilePdf;

  formData = {
    productName:'',
    Price:'',
    unit:'',
    shippingOption: 'included',
    taxOption: 'included',
    productdescription: '',
  };
 
  isUnitOpen = false;
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



  constructor(private fb: FormBuilder,private FetchproductService : FetchProductService,private chatservice : ChatserviceService,  private productserviceService: ProductserviceService, private dataTransferService: SellerservicesService ,
    private http: HttpClient,private router:Router,private cdr: ChangeDetectorRef) {
      console.log("faYoutube:", this.faYoutube);
      console.log("faFilePdf:", this.faFilePdf);
    }

    addMore() {
      const productData = {
        productname: this.formData.productName,
        price: this.formData.Price + "/" + this.formData.unit,
        productdescription: this.formData.productdescription,
        file: this.fileBase64, // Include the Base64 string
        pdfFile: this.PdfBase64,
        mobilenumber: this.mobilenumber,
        youtubelink: this.youtubeLink,
        shippingoption: this.formData.shippingOption,
        taxoption: this.formData.taxOption

      };
  
      console.log(productData); // Check the product data
  
      this.productserviceService.postproductdata(productData).subscribe({
        next: response => {
          console.log('Product submitted successfully', response);
          this.resetForm();
        },
        error: error => {
          console.error('Error submitting form', error);
        },
        complete: () => {
          console.log('Request completed');
        }
      });
  
     
    }

    resetForm(){
      this.formData = {
        productName: '',
        Price: '',
        unit: '',
        shippingOption: 'included',
        taxOption: 'included',
        productdescription: ''
      };

      this.url = 'addphoto.png'; // Reset image to placeholder
      this.selectedFile = null;
      this.youtubeLink = '';
      this.pdfFile = null;
      this.pdfFileName = '';
      this.fileBase64 = null;
      this.PdfBase64 = null;
      this.isYouTubeAttached = false;
      this.isPDFAttached = false;
  
      // Force Angular to detect changes
      this.cdr.detectChanges();

    }
    

   
    onSubmit() {
      const productData = {
        productname: this.formData.productName,
        price: this.formData.Price + this.formData.unit,
        productdescription: this.formData.productdescription,
        file: this.fileBase64, // Include the Base64 string
        pdfFile: this.PdfBase64,
        mobilenumber: this.mobilenumber,
        youtubelink: this.youtubeLink,
        shippingoption: this.formData.shippingOption,
        taxoption: this.formData.taxOption

      };
  
      console.log(productData); // Check the product data
  
      this.productserviceService.postproductdata(productData).subscribe({
        next: response => {
          console.log('Product submitted successfully', response);
          console.log("Redirecting to GST page...");
          this.router.navigateByUrl("app-addgst");
        },
        error: error => {
          console.error('Error submitting form', error);
          this.router.navigateByUrl("app-addgst");
        },
        complete: () => {
          console.log('Request completed');
        }
      });
  
    
    }
    
    triggerFileInput() {
      if (this.fileInput) {
        this.fileInput.nativeElement.click();
      }
    }

    toggleDropdownunit() {
      this.isUnitOpen = !this.isUnitOpen;
      console.log("Dropdown open:", this.isUnitOpen); 
    }
    
    selectUnit(unit: string): void {
      this.formData.unit = unit; // Store selected unit
      this.isUnitOpen = false;
      localStorage.setItem('selectedUnit', unit);
      console.log("Selected unit:", unit);  // Close dropdown
    }


    onFileSelected(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        this.selectedFile = inputElement.files[0];
  
        // File Size Check (200 KB limit)
        if (this.selectedFile.size > 200 * 1024) {
          alert('File size exceeds 200 KB. Please choose a smaller file.');
          return;
        }
  
        console.log('File selected:', this.selectedFile.name);
  
        // Read and display the selected file as Base64
        this.readFileAsBase64(this.selectedFile);
        this.previewImage(this.selectedFile);
        
      }
    }

    uploadPDF(event: any) {
      this.pdfFile = event.target.files[0];
      console.log(this.pdfFile);
      this.readPdfAsBase64(this.pdfFile);
    }

    readPdfAsBase64(file: File | null) {
      if (!file) {
        console.error('Invalid file');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.PdfBase64 = event.target.result; // Store the Base64 string
      };
      reader.readAsDataURL(file);
    }

  // Read file as Base64 string
  readFileAsBase64(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.fileBase64 = event.target.result; // Store the Base64 string
    };
    reader.readAsDataURL(file); // Convert file to Base64
  }

   

    uploadVideo():void {
      const link = prompt("Enter YouTube Link:");
      if (link) {
        if (link.includes('youtube.com') || link.includes('youtu.be')) {
          this.youtubeLink = link;
          console.log("youtube link : " + this.youtubeLink);
          this.isYouTubeAttached = true;
        } else {
          alert('Please enter a valid YouTube link.');
        }
      }
    }

   
  
    savePdf() {
      if (this.pdfFile) {
        console.log('PDF Uploaded:', this.pdfFile.name);
        this.pdfFile = null; // Hide after saving
      }
    }
  

  // Preview the selected image
  previewImage(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      this.url = event.target.result; // Set the URL for the selected image
    };
  }




  // Additional fields
  name: string = '';
  mobileNumber: string = '';
  company: string = '';
  email: string = '';

  ngOnInit(): void {
   
    this.mobilenumber = this.dataTransferService.getData();
    console.log(this.mobilenumber);
   
    this.FetchproductService.getSellerByMobile(this.mobilenumber).subscribe((data:any)=>{
      this.sellerDetails = data || {};
      console.log(this.sellerDetails);
    }),
    (error:any) => {
      console.error("Error fetching seller details:", error);
    }


    // this.chatservice.getsellerDetailsByMobileNumber(this.mobilenumber).subscribe({
    //   next: (data) => {
    //     console.log("Fetched Seller Details:", data);
  
    //     // Ensure sellerDetails is assigned properly
    //     if (typeof data === 'object') {
    //       this.sellerDetails = data;
    //     } else {
    //       console.error("Unexpected data format:", data);
    //       this.sellerDetails = null;
    //     }
    //   },
    //   error: (error) => {
    //     console.error("Error fetching seller details:", error);
    //     this.sellerDetails = null;
    //   }
    // });
  }

 
}



  // @ViewChild('fileInput', { static: false }) fileInput: ElementRef | null = null;

  // url: string = 'addphoto.png'; // Default placeholder image
  // selectedFile: File | null = null;
  // productName: string = '';
  // Price: string = '';
  // productdescription: string = '';
  // fileBase64: string | null = null; // Base64 string for the file
  // mobilenumber: string = '';
  // sellerDetails : any;
  // products = Array(3).fill({
  //   previewUrl: null,
  //   file: null,
  //   name: '',
  //   price: '',
  //   description: '',
  // });



  // constructor(private productserviceService: ProductserviceService,    private dataTransferService: SellerservicesService ,
  //   private http: HttpClient,private router:Router,private chatservice : ChatserviceService) {}

   
    // triggerFileInput(index: number) {
    //   const inputElement = this.fileInputs.toArray()[index].nativeElement;
    //   inputElement.click();
    // }
  
    // // Handle File Selection
    // onFileSelected(event: Event, index: number) {
    //   const inputElement = event.target as HTMLInputElement;
    //   if (inputElement.files && inputElement.files.length > 0) {
    //     const file = inputElement.files[0];
  
    //     // File Size Check (200 KB limit)
    //     if (file.size > 200 * 1024) {
    //       alert('File size exceeds 200 KB. Please choose a smaller file.');
    //       return;
    //     }
  
    //     const reader = new FileReader();
    //     reader.onload = (e: any) => {
    //       this.products[index].previewUrl = e.target.result;
    //     };
    //     reader.readAsDataURL(file);
    //     this.products[index].file = file;
    //   }
    // }
  
    // onSubmit() {
  
    //   const formData = new FormData();
  
    //   this.products.forEach((product) => {
    //     if (product.file) {
    //       this.convertToBase64(product.file).then(base64Image => {
    //         formData.append("productImages", base64Image); // Append Base64 image after conversion
    
    //         // After appending image, append other product details
    //         formData.append("productName", product.name);  // Append product name
    //         formData.append("price", product.price);        // Append price
    //         formData.append("productDescription", product.description); // Append description
            
    //         // Get mobile number and append to form data
    //         const userMobileNumber = this.dataTransferService.getData();
    //         formData.append("mobileNumber", userMobileNumber);
    
    //         // Now send the form data to the backend after image and other data are appended
    //         this.productserviceService.postproductdata(formData).subscribe({
    //           next: response => console.log("Product submitted successfully", response),
    //           error: error => console.error("Error submitting form", error),
    //         });
    
    //       }).catch(error => {
    //         console.error("Error converting file to Base64", error);
    //       });
    //     } else {
    //       // If no file is selected, still append other product data
    //       formData.append("productName", product.name);
    //       formData.append("price", product.price);
    //       formData.append("productDescription", product.description);
    //     }
    //   });
    
    // }
  
    // convertToBase64(file: File): Promise<string> {
    //   return new Promise((resolve, reject) => {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       const base64String = reader.result as string;
    //       resolve(base64String);
    //     };
    //     reader.onerror = (error) => reject(error);
    //     reader.readAsDataURL(file); // Read file as Base64
    //   });
    // }
    
  
    // Handle Form Submission
    // onSubmit() {
    //   const formData = new FormData();
  
    //   this.products.forEach((product, index) => {
    //     if (product.file) {
    //       formData.append(`productImage${index + 1}`, product.file);
    //     }
    //     formData.append(`productName${index + 1}`, product.name);
    //     formData.append(`productPrice${index + 1}`, product.price);
    //     formData.append(`productDescription${index + 1}`, product.description);
    //   });
  
    //   const userMobileNumber = this.dataTransferService.getData();
    //   formData.append('mobileNumber', userMobileNumber);
    //   this.productService.postproductdata(formData).subscribe({
    //     next: response => console.log('Product submitted successfully', response),
    //     error: error => console.error('Error submitting form', error),
    //   });
  
    //   this.router.navigateByUrl("app-addgst");
    // }
  
  
  
  // Handle form submission
  // onSubmit() {
    // Prepare the product data object
    // const productData = {
    //   productName: this.productName,
    //   price: this.Price,
    //   productDescription: this.productdescription,
    //   file: this.fileBase64, // Include the Base64 string
    //   mobileNumber: this.mobilenumber,
    // };

    // console.log(productData); // Check the product data

    // this.productserviceService.postproductdata(productData).subscribe({
    //   next: response => {
    //     console.log('Product submitted successfully', response);
    //   },
    //   error: error => {
    //     console.error('Error submitting form', error);
    //   },
    //   complete: () => {
    //     console.log('Request completed');
    //   }
    // });

    // triggerFileInput(index: number) {
    //   const inputElement = this.fileInputs.toArray()[index].nativeElement;
    //   inputElement.click();
    // }

  //   const formData = new FormData();
  //   this.products.forEach((product, index) => {
  //     if (product.file) {
  //       formData.append(`product${index + 1}`, product.file);
  //     }
  //     formData.append(`name${index + 1}`, product.name);
  //     formData.append(`price${index + 1}`, product.price);
  //     formData.append(`description${index + 1}`, product.description);
  //   });
   
  //   this.router.navigateByUrl("app-addgst");
  // }

 

  // // Handle file selection
  // onFileSelected(event: any,index:number) {
  //   // const inputElement = event.target as HTMLInputElement;
  //   // if (inputElement.files && inputElement.files.length > 0) {
  //   //   this.selectedFile = inputElement.files[0];

  //   //   // Log the selected file's name
  //   //   console.log('File selected:', this.selectedFile.name);

  //   //   // Read and display the selected file as Base64
  //   //   this.readFileAsBase64(this.selectedFile);
  //   //   this.previewImage(this.selectedFile);
  //   // }

  //   const file = event.target.files[0];
  //   if (file.size > 200 * 1024) {
  //     alert('File size exceeds 200 KB. Please choose a smaller file.');
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.onload = (e: any) => {
  //     this.products[index].previewUrl = e.target.result;
  //   };
  //   reader.readAsDataURL(file);
  //   this.products[index].file = file;
  // }

  // // Read file as Base64 string
  // readFileAsBase64(file: File) {
  //   const reader = new FileReader();
  //   reader.onload = (event: any) => {
  //     this.fileBase64 = event.target.result; // Store the Base64 string
  //   };
  //   reader.readAsDataURL(file); // Convert file to Base64
  // }

  // // Preview the selected image
  // previewImage(file: File) {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = (event: any) => {
  //     this.url = event.target.result; // Set the URL for the selected image
  //   };
  // }

  // Additional fields

  // Getting data from business detail page


   
