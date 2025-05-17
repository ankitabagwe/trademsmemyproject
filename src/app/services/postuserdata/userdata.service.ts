import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {


  private apiUrl = '${environment.apiBaseUrl}/userprofile';
  private apiUrl1 = '${environment.apiBaseUrl}/gstdetails';
  private apiUrl2 = '${environment.apiBaseUrl}/getsellerdetailsforchat';

  constructor(private http:HttpClient) { }

  getSellerDetails(contactNumber: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}/${contactNumber}`);
  }

  registerBuyer(userProfile: any): Observable<any> {
    return this.http.post(this.apiUrl, userProfile, { responseType: 'text' });
  }

  saveGstPan(data: any): Observable<any> {
    return this.http.post(this.apiUrl1, data);
  }

  // //for name getting on home page after login.

  private buyerNameSource = new BehaviorSubject<string | null>(null); // Default value is an empty string
  buyerName$ = this.buyerNameSource.asObservable();

  setBuyerName(name: string): void {
    this.buyerNameSource.next(name); // Update the buyer's name
  }
  clearBuyerName(): void {
    this.buyerNameSource.next(null); // Clear the buyer's name (e.g., on logout)
  }

}
