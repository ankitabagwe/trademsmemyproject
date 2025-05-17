import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
  private name: string = '';
  private mobileNumber: string = '';
  private company: string = '';
  private email: string = '';

//posting product data to eclipse(springboot)
private apiUrl = '${environment.apiBaseUrl}/addproducts'; 
private apiurl2 = '${environment.apiBaseUrl}/getproductbymobile'
private apiurl3 = '${environment.apiBaseUrl}/deleteproduct'

  constructor(private http : HttpClient) { }

  postproductdata(formdata : any){
    return this.http.post(this.apiUrl, formdata ,{ responseType: 'text' } )
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiurl3}/${id}`, { responseType: 'text' });
  }

  getproductbymobile(mobilenumber:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiurl2}/${mobilenumber}`);
  }


  setData(name: string, mobileNumber: string, company: string, email: string): void {
    this.name = name;
    this.mobileNumber = mobileNumber;
    this.company = company;
    this.email = email;
  }

  getData(): { name: string, mobileNumber: string, company: string, email: string } {
    return {
      name: this.name,
      mobileNumber: this.mobileNumber,
      company: this.company,
      email: this.email
    };
  }
    
}
