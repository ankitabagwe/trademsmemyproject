import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buisnessdetailsclass } from '../../classes/buisnessdetailsclass';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  private mobileNumberSource = new BehaviorSubject<string | null>(null);
  mobileNumber$ = this.mobileNumberSource.asObservable();

  setMobileNumber(mobileNumber: string): void {
    this.mobileNumberSource.next(mobileNumber);
    
  }

  getMobileNumber(): string | null {
    return this.mobileNumberSource.getValue();
  }

  private sellerDataSource = new BehaviorSubject<any>(null);
  sellerData$ = this.sellerDataSource.asObservable();

  setSellerData(data: any) {
    this.sellerDataSource.next(data);
  }
  
  
  private url = "${environment.apiBaseUrl}/buisnessdetails";
  
  constructor(private http:HttpClient) {}


   postData(buisnessdetailsclass : Buisnessdetailsclass):Observable<object>
   {

    return this.http.post(`${this.url}`,buisnessdetailsclass);
    
   }
}
