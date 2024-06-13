import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Activity } from '../models/activityModel';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminAddActivityForUserService {

  constructor(private http: HttpClient) { }


  searchUserIDByEmail(email: string): Observable<string> {
    const apiUrl = `http://localhost:3000/api/v1/users?email=${email}`;
    return this.http.get<any>(apiUrl, { withCredentials: true }).pipe(
      map(result => result.data.document[0]._id)
    );
  }


  addActivityForUser(activity: Activity, email: string): Observable<any> {
    const apiUrl = `http://localhost:3000/api/v1/activities`;
    return this.searchUserIDByEmail(email).pipe(
      switchMap(userId => {
        activity.userID = userId;
        const activityToSend = { ...activity };
        console.log(typeof(activityToSend.activityDate));
        return this.http.post(apiUrl, activityToSend, { withCredentials: true });
      })
    );
  }
}



