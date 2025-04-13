import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { SellerservicesService } from '../../app/sellertool/sellertoolservice/sellerservices.service';
import { Buisnessdetailsclass } from '../../classes/buisnessdetailsclass';
import { MyServiceService } from '../../app/services/my-service.service';
import { ProductserviceService } from '../productdetails/productdetailsservice/productservice.service';
import { ProductdetailsComponent } from '../productdetails/productdetails.component';
import { NavbarComponent } from '../sellerbody/navbar/navbar.component';
@Component({
  selector: 'app-buisnessdetails',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink,RouterOutlet,RouterModule,NavbarComponent],
  templateUrl: './buisnessdetails.component.html',
  styleUrl: './buisnessdetails.component.css'
})
export class BuisnessdetailsComponent implements OnInit{
  Buisnessdetailsclass :Buisnessdetailsclass = new Buisnessdetailsclass();
  mobilenumber: string = '';

  buisnessdetails = new FormGroup({
    Name: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z ]+$')
    ]),
    Companydetails: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern('(?=.*[a-zA-Z])[a-zA-Z0-9 ]+')
    ]),
    emailaddress: new FormControl('', [Validators.required, Validators.email]),
    Pincode: new FormControl('', [
      Validators.required,
      Validators.pattern('^[1-9][0-9]{5}$')  // 6-digit valid Indian pin code
    ]),
    City: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$')  // Only alphabets and spaces allowed
    ]),
    State: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$')  // Only alphabets and spaces allowed
    ])
  
  });

  constructor(private dataTransferService: SellerservicesService ,
    private MyServiceService : MyServiceService,
    private productserviceService :ProductserviceService,
    private router : Router,
  ) {}

  ngOnInit(): void {

    //getting data from main seller page
    this.mobilenumber = this.dataTransferService.getData();
    console.log(this.mobilenumber);

  }


  get user(){
    return this.buisnessdetails.get('username');
  }

  get companydetails(){
    return this.buisnessdetails.get('companydetails');
  }

  get emailid(){
    return this.buisnessdetails.get('emailid');
  }

  get pincode() {
    return this.buisnessdetails.get('Pincode');
  }

  get city() {
    return this.buisnessdetails.get('City');
  }

  get state() {
    return this.buisnessdetails.get('State');
  }

  verifylater() {
    if (this.buisnessdetails.valid) {
      // Populate the `Buisnessdetailsclass` object
      this.Buisnessdetailsclass.mobilenumber = this.mobilenumber;
      this.Buisnessdetailsclass.name = this.buisnessdetails.get('Name')?.value ?? '';
      
      this.Buisnessdetailsclass.companydetails = this.buisnessdetails.get('Companydetails')?.value ?? '';
      this.Buisnessdetailsclass.emailaddress = this.buisnessdetails.get('emailaddress')?.value ?? '';
      this.Buisnessdetailsclass.pincode = this.buisnessdetails.get('Pincode')?.value ?? '';
      this.Buisnessdetailsclass.city = this.buisnessdetails.get('City')?.value ?? '';
      this.Buisnessdetailsclass.state = this.buisnessdetails.get('State')?.value ?? '';


      // Call the service to save the data
      this.MyServiceService.postData(this.Buisnessdetailsclass).subscribe({
        next: (response) => {
          console.log('Data saved successfully:', response);
          this.router.navigateByUrl('productdetails'); // Navigate after successful submission
        },
        error: (error) => console.error('Error saving data:', error),
      });
    } else {
      console.log('Form is invalid');
    }
  }





//   name: string = '';
  
//   company: string = '';
//   email: string = '';

  

//   gotoproduct(){
//     this.router.navigateByUrl("productdetails");
//   }


// //
//   insertbuisnessdetails(){
//     this.MyServiceService.postData(this.Buisnessdetailsclass).subscribe(data=>{
//       console.log(data);
//     })
//   }




 

  // buisnessdetails = new FormGroup({
  //   username : new FormControl('',[Validators.required, Validators.maxLength(30),Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
  //   companydetails : new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(100), Validators.pattern('(?=.*[a-zA-Z])[a-zA-Z0-9]+')]),
  //   emailid: new FormControl('',[Validators.required, Validators.email]),

  // });



 
  // verifylater(){
  //   this.insertbuisnessdetails();

  //   if (this.buisnessdetails.valid) {
  //     // Send the form values directly to the service
  //     this.productserviceService.setData(
  //       this.buisnessdetails.get('username')?.value ?? '',
  //       this.mobileNumber,
  //       this.buisnessdetails.get('companydetails')?.value ??'',
  //       this.buisnessdetails.get('emailid')?.value??''
  //     );
  
  //     // Optionally, you can still log the form values for debugging
  //     console.log(this.buisnessdetails.value);
  //   } else {
  //     // Handle form validation errors
  //     console.log('Form is invalid');
  //   }
  //   console.log(this.buisnessdetails.value );
  //   console.log(this.buisnessdetails.valid);
  //   console.log(this.buisnessdetails.errors);
  //   console.log(this.Buisnessdetailsclass);



    
  // }

  isActive = false;
  hasKeyPress = false;
  
  onkeypress() {
    this.isActive = true;
    this.hasKeyPress = true;
  }
  
  onFocus() {
    if (this.hasKeyPress) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
  }
  
  onBlur() {
    this.isActive = false;
    this.hasKeyPress = false;
  }
}
