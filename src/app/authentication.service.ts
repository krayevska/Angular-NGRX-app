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
  private currentUserSubject: BehaviorSubject<any>;
  private currentUser: Observable<CurrentUser>;
  user$: Observable<CurrentUser[]>;

  constructor(
    private http: HttpClient,
    private store: Store<{ user: CurrentUser[] }>
  ) {
    this.currentUserSubject = new BehaviorSubject<CurrentUser>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.user$ = store.select('user');
  }

  public get currentUserValue(): CurrentUser {
    return this.currentUserSubject.value;
  }

  login(email, password) {
    return this.http
      .post<CurrentUser>(`${this.apiUrl}/api/login`, {
        email,
        password,
      })
      .pipe(
        map((user: CurrentUser) => {
          console.log('USER IN SERVICE ', user);

          this.store.dispatch(getCurrentUser({ user }));

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
