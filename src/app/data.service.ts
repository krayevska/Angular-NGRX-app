import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Assessment, Report, User } from './interfaces';
import { Store } from '@ngrx/store';
import { AdminUser } from './interfaces';
import { setAllUsers, setAssestments } from './state/user.actions';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private http: HttpClient,
    private store: Store<{ user: User[] }>
  ) {
    this.user$ = store.select('user');
  }
  private apiUrl = 'https://ds-test-api.herokuapp.com';
  user$: Observable<User[]>;

  getUserAssessments(): Observable<Assessment[]> {
    return this.http
      .get<Assessment[]>(`${this.apiUrl}/api/userassessments`)
      .pipe(
        map((assessments) => {
          this.store.dispatch(setAssestments({ assessments }));
          return assessments;
        })
      );
  }

  getUserAssessmentsReport(id: number): Observable<Report> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', id.toString());
    let url = `${this.apiUrl}/api/userassessment/graph`;

    return this.http.get<Report>(url, { params: queryParams });
  }

  getAllUsers(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(`${this.apiUrl}/api/users`).pipe(
      map((adminUsers) => {
        this.store.dispatch(setAllUsers({ adminUsers }));
        return adminUsers;
      })
    );
  }
}
