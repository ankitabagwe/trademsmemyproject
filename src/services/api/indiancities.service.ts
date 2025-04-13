import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndiancitiesService {
  private apiUrl = 'https://mocki.io/v1/f43d7006-2216-420a-b5f2-effa38b3108f'; 
  private apiUrl1 = 'https://mocki.io/v1/3e911694-6c09-4453-a7e9-70602f54a2e5';

   constructor(private http: HttpClient) { }

  getCities(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getUnits():Observable<any>{
    return this.http.get<any>(this.apiUrl1);
  }
}
