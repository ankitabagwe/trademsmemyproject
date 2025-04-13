import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserdataService } from '../../app/services/postuserdata/userdata.service';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { SellerservicesService } from '../../app/sellertool/sellertoolservice/sellerservices.service';
import { FetchProductService } from '../../app/services/fetchproduct/fetch-product.service';
import { NavbarComponent } from '../sellerbody/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addgst',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink,RouterOutlet,RouterModule,NavbarComponent],
  templateUrl: './addgst.component.html',
  styleUrl: './addgst.component.css'
})
export class AddgstComponent {
  mobilenumber: string = '';
  sellerDetails : any;
  hasGST: string = ''; // Stores user selection
  gstNumber: string = '';
  panNumber: string = '';
  // form: FormGroup;
  constructor(private fb: FormBuilder, private http : HttpClient, private dataTransferService: SellerservicesService ,
    private FetchproductService : FetchProductService,private service:UserdataService,private router: Router,private cdr: ChangeDetectorRef) {
    // this.form = this.fb.group({
    //   hasGST: [true], // Default to "I have GSTN"
    //   gstNumber: ['', [Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)]],
    //   panNumber: ['', [Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]]
    // });

    // // Dynamically validate based on hasGST selection
    // this.form.get('hasGST')?.valueChanges.subscribe((hasGST) => {
    //   if (hasGST) {
    //     this.form.get('gstNumber')?.setValidators([
    //       Validators.required,
    //       Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)
    //     ]);
    //     this.form.get('panNumber')?.clearValidators();
    //   } else {
    //     this.form.get('panNumber')?.setValidators([
    //       Validators.required,
    //       Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    //     ]);
    //     this.form.get('gstNumber')?.clearValidators();
    //   }
    //   this.form.get('gstNumber')?.updateValueAndValidity();
    //   this.form.get('panNumber')?.updateValueAndValidity();
    // });
  }

  ngOnInit(): void {
  this.mobilenumber = this.dataTransferService.getData();
  console.log(this.mobilenumber);
 
  this.FetchproductService.getSellerByMobile(this.mobilenumber).subscribe((data:any)=>{
    this.sellerDetails = data || {};
    console.log(this.sellerDetails);
    this.cdr.detectChanges(); 
  }),
  (error:any) => {
    console.error("Error fetching seller details:", error);
  }
  }


  //updating pan or gst of the DB.


  gotoseller(){
   
this.router.navigateByUrl("app-sellerbody/dashboard");
  }

  onSubmit(form: any) {
    console.log("onSubmit() triggered!");
   
  
    console.log("Form is valid, preparing data...");
    if (form.valid) {
      const data = {
        mobilenumber :this.dataTransferService.getData(),
        gstNumber: this.hasGST === 'true' ? this.gstNumber : '',
        panNumber: this.hasGST === 'false' ? this.panNumber : '',
        tan: '',
        cinllpin: '',
        importexportcode: '',
        accountnumber:'',
        ifsc: '',
        accountholdername: '',
        branchname: '',
        bankname: ''
      };

      this.http.put(`http://localhost:8081/sellerupdateadditional/${data.mobilenumber}`,data,{ responseType: 'text' }).subscribe(response => {
        console.log("Business details updated successfully!", response);
      }, error => {
        console.error("Error updating business details", error);
      });

      // this.service.saveGstPan(data).subscribe(
      //   (response) => console.log('GST/PAN sent successfully!', response),
      //   (error) => console.error('Error sending GST/PAN:', error)
      // );
    } else {
      console.error('Form is invalid');
    }
  }
}
