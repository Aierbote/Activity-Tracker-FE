import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutteAttivitàUserService {
private apiUrl = 'http://localhost:3000/api/v1/activities'; //URL API

  constructor(private http: HttpClient) { }

  recuperaTutteLeAttivita(): Observable<any> {
 
    return this.http.get(this.apiUrl,{withCredentials:true});
  }
}
