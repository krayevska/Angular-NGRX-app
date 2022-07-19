import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentUser } from './interfaces';

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
