import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserdataService } from '../app/services/postuserdata/userdata.service';
import { Router, RouterLink } from '@angular/router';
import { MyServiceService } from '../app/services/my-service.service';

@Component({
  selector: 'app-buyerregistration',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './buyerregistration.component.html',
  styleUrl: './buyerregistration.component.css'
})
export class BuyerregistrationComponent {
  
  
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder,private postuserdata:UserdataService,private router:Router, private myServiceService : MyServiceService,) {}

  ngOnInit(): void {
    // Initialize the form group with form controls
    this.profileForm = this.fb.group({
      mobilenumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      city: ['', Validators.required],
      companyname: ['', Validators.required],
      gstin: ['', Validators.required],
      pan: ['', Validators.required],
      ifsccode: ['', Validators.required],
      accountnumber: ['', Validators.required],
      bankname: ['', Validators.required],
      accounttype: [Validators.required],
    });
  }



  onSubmit() {

    if (this.profileForm.valid) {
      const profileData = this.profileForm.value; // Extract form data
      console.log('Sending data:', profileData);
  
      this.postuserdata.registerBuyer(profileData).subscribe({
        next: (response) => {
          console.log('Profile saved successfully!', response);
          alert('Profile saved successfully!');
          localStorage.setItem('buyerName', profileData.name);
          this.postuserdata.setBuyerName(profileData.name);
          // Redirect to the 
          this.myServiceService.setMobileNumber(profileData.mobilenumber);
          this.router.navigateByUrl("app-withregistration");

        },
        error: (error) => {
          console.error('Error saving profile!', error);
          alert('Failed to save profile. Please try again.');
        }
      });
    } else {
      console.log('Form is invalid');
      alert('Please fill out all required fields correctly.');
    }
  }
}
