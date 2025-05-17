import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellerservicesService {

private mobilenumber: any;

constructor(private http: HttpClient) { }
getSellerInquiries(sellerMobileNumber: string) {
  return this.http.get<any[]>(`${environment.apiBaseUrl}/getSellerInquiries?sellerMobileNumber=${sellerMobileNumber}`);
}

setData(mobilenumber: any): void {
this.mobilenumber = mobilenumber;
}

getData(): any {
  return this.mobilenumber;
}



}

