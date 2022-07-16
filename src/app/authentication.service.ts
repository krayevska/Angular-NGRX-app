import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentUser } from './interfaces';
import { Store } from '@ngrx/store';
import { getCurrentUser, resetCurrentUser } from './state/user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'https://ds-test-api.herokuapp.com';

  constructor(private http: HttpClient) {}

  login(email, password) {
    return this.http.post<CurrentUser>(`${this.apiUrl}/api/login`, {
      email,
      password,
    });
  }
}
