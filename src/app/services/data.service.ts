import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assessment, Report } from '../models/interfaces';
import { User } from '../models/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.baseUrl;

  getUserAssessments(): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(`${this.apiUrl}/api/userassessments`);
  }

  getUserAssessmentsReport(idObject: any): Observable<Report> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', idObject);

    let url = `${this.apiUrl}/api/userassessment/graph`;

    return this.http.get<Report>(url, { params: queryParams });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/api/users`);
  }
}
