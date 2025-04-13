import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signuppage',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './signuppage.component.html',
  styleUrl: './signuppage.component.css'
})
export class SignuppageComponent {
  constructor(private router: Router) {}
  toggledrpdwn = false;
  phoneNumber: string = '';
  getdrpdwn(){
    this.toggledrpdwn = !this.toggledrpdwn;
  }
  getData(input: string){
    console.warn(input);
  }
  
  openModal() {
    const modalElement = document.getElementById('signInModal');  // Grab the modal by its ID
    if (modalElement) {
      const myModal = new Modal(modalElement);  // Initialize the Bootstrap modal
      myModal.show();  // Show the modal
    }
  }

  submitPhoneNumber() {
    if (this.phoneNumber.length === 10) {
      // Handle phone number submission logic here
      console.log('Phone Number Submitted:', this.phoneNumber);
      this.router.navigate(['/buyerregistration']);
    } else {
      alert('Please enter a valid 10-digit mobile number');
    }

    
  }
 
}
