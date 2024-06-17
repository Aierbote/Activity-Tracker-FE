import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../models/activityModel';

@Injectable({
  providedIn: 'root'
})
export class ModificAttivitàAdminVisUtenteSpecificoService {
  private apiUrl = 'http://localhost:3000/api/v1/users'  // URL dell'API


  constructor(private http:HttpClient) { }

  updateUserActivities(id: string, activity: Activity): Observable<any> {
    const url = `http://localhost:3000/api/v1/activities/${id}`;
    return this.http.patch(url, activity, {withCredentials: true});
  }
}