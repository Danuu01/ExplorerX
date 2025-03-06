
import { Injectable } from '@angular/core';
import { Futuretrip } from './futuretrip';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  backendUrl = 'http://localhost:4000'; 

  constructor(private http: HttpClient) { } 


  getAllFuturetrips(): Observable<Futuretrip[]> {
    return this.http.get<Futuretrip[]>(this.backendUrl + "/futureTrips"); 
  }
}

