import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FetchProductService {

  private apiUrl = 'http://localhost:8081/search'; 
  private apiurl1 = 'http://localhost:8081/random';
 private apiurl2 = 'http://localhost:8081/login';
 private apiurl3 = 'http://localhost:8081/sendtoseller';
private apiurl4 = 'http://localhost:8081/getbuissnessdata';
private apiUrl5 = 'http://localhost:8081/sellerupdateadditional/updateadditional';


 private loginStatus = new BehaviorSubject<boolean>(false);
 private productsSubject = new BehaviorSubject<any[]>([]);

 products$ = this.productsSubject.asObservable();

 private responseSubject = new BehaviorSubject<any>(null); // Shared data
 response$ = this.responseSubject.asObservable();
  constructor(private http:HttpClient) { }
 
  getSellerByMobile(mobileNumber: string): Observable<string> {
    return this.http.get<string>(`${this.apiurl4}/${mobileNumber}`);
  }

  getSelleradditionalByMobile(mobileNumber: string) {
    return this.http.get<any>(`${this.apiUrl5}/${mobileNumber}`);
  }

  sendToBuyLeads(query: string, mobileNumber: string ) {
    const requestdata = { query, mobileNumber };

    // Send the POST request
    this.http.post<any>('http://localhost:8081/sendtobuyleads', requestdata).subscribe(
      (data) => {
        // Update the shared data
        this.responseSubject.next(data);
        console.log('Response from backend:', data);
      },
      (error) => {
        console.error('Error sending to Buy Leads', error);
      }
    );
  }

  //to send the data to seller
  sendInquiryToSeller(data: any): Observable<any> {
    return this.http.post(`${this.apiurl3}`, data);
  }

  setLoginStatus(status: boolean) {
    this.loginStatus.next(status);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }
  updateProducts(products: any[]) {
    this.productsSubject.next(products);
  }
  getProducts(productname: string,city: string): Observable<any[]> {
    let searchUrl = `${this.apiUrl}?productname=${productname}`;
    if (city) {
      searchUrl += `&city=${city}`; // **Add city to URL if not null**
    }
    return this.http.get<any[]>(searchUrl); 
    
   
  }

  getRandomProducts(limit: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiurl1}?limit=${limit}`);
  }

  
}
