import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'https://ds-test-api.herokuapp.com';
  private currentUserSubject: BehaviorSubject<any>;
  private currentUser: Observable<User>;

  constructor(private http: HttpClient, private httpBackend: HttpBackend) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email, password) {
    return this.http
      .post<User>(`${this.apiUrl}/api/login`, { email, password })
      .pipe(
        map((user) => {
          console.log('USER IN SERVICE ', user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
