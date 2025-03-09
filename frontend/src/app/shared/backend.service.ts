
import { Injectable } from '@angular/core';
import { Futuretrip } from './futuretrip';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  
  backendUrl = 'http://localhost:4000'; 
  apiURL: string | undefined;

  constructor(private http: HttpClient) { } 


  getAllFuturetrips(): Observable<Futuretrip[]> {
    return this.http.get<Futuretrip[]>(this.backendUrl + "/futureTrips"); 
  }

  getOneFuturetrip(id: number): Observable<Futuretrip> {
    const url = `${this.backendUrl}/futureTrips/${id}`;
    return this.http.get<Futuretrip>(url);
  }



   /* async getOneFuturetrip(id: number): Promise<Futuretrip> {
    let response = await fetch(`${this.backendUrl}/futureTrips/${id}`);
    let futuretrip = await response.json();
    console.log('futuretrip in service (getOneVocab) : ', futuretrip);
    return futuretrip;
   }*/

   updateFuturetrip(id: number, futuretrip: Futuretrip): Observable<Futuretrip> {
    const url = `${this.backendUrl}/futureTrips/${id}`;
    return this.http.put<Futuretrip>(url, futuretrip);
  }

  deleteFuturetrip(id: number): Observable<void> {
    const url = `${this.backendUrl}/futureTrips/${id}`;
    return this.http.delete<void>(url);
  }

  
}

