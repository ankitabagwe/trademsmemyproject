import { Injectable,inject } from '@angular/core';
import { Auth,ConfirmationResult,signInWithPhoneNumber ,RecaptchaVerifier} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  
  constructor() { }


firebaseAuth = inject(Auth);

 
//   initializeRecaptcha(elementId: string) {
//     this.recaptchaVerifier = new RecaptchaVerifier(elementId,{
//    size : 'invisible',
//    callback : (Response : any)=>{
//     console.log('Recaptcha resolved:', Response);
//    },
//     },this.firebaseAuth);
  }
