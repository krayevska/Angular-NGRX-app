import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentUser } from '../models/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  login(email, password) {
    return this.http.post<CurrentUser>(`${this.apiUrl}/api/login`, {
      email,
      password,
    });
  }
}
