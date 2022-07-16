import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Assessment, Report, CurrentUser } from './interfaces';
import { Store } from '@ngrx/store';
import { User } from './interfaces';
import { setAssestments } from './state/user.actions';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://ds-test-api.herokuapp.com';

  getUserAssessments(): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(`${this.apiUrl}/api/userassessments`);
  }

  getUserAssessmentsReport(idObject: any): Observable<Report> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', idObject.id);

    let url = `${this.apiUrl}/api/userassessment/graph`;

    return this.http.get<Report>(url, { params: queryParams });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/api/users`);
  }
}
