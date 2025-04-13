import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from '../sellertool/sellerbody/navbar/navbar.component';
import { FormBuilder, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { faCamera, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { ChatserviceService } from '../chatservice.service';
import { ProductserviceService } from '../sellertool/productdetails/productdetailsservice/productservice.service';
import { SellerservicesService } from '../app/sellertool/sellertoolservice/sellerservices.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FontAwesomeModule ,RouterLink,NavbarComponent,FormsModule,RouterOutlet,RouterModule,CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
    
    @ViewChild('fileInput', { static: false }) fileInput: ElementRef | null = null;
    @ViewChild('pdfInput') pdfInput!: ElementRef;
  
    products : any[] = [];

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
  
  
  
    constructor(private fb: FormBuilder,private chatservice : ChatserviceService,  private productserviceService: ProductserviceService, private dataTransferService: SellerservicesService ,
      private http: HttpClient,private router:Router,private cdr: ChangeDetectorRef) {
        console.log("faYoutube:", this.faYoutube);
        console.log("faFilePdf:", this.faFilePdf);
      }
  
      ngOnInit(): void {
     
        this.mobilenumber = this.dataTransferService.getData();
        console.log(this.mobilenumber);
       this.fetchProducts();
    
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
    
  
     
      onSubmit() {
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
  
  
  
  
  
    
  


    //code to fetch a particular seller products using mobilenumber.
    fetchProducts(): void {
      this.productserviceService.getproductbymobile(this.mobilenumber).subscribe(
        (data) => {
          this.products = data;
          console.log(this.products);
        },
        (error) => {
          console.error('Error fetching products', error);
        }
      );
    }
    

    //To delete the product

    deleteProduct(id: number){
       this.productserviceService.deleteProduct(id).subscribe(
        (response) => {
          console.log(response);
          this.products = this.products.filter(product => product.id !== id); // Remove from UI
        },
        (error) => {
          console.error("Error deleting product", error);
        }
      );
    }

}
