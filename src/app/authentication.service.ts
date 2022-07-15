import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './interfaces';
import { Store } from '@ngrx/store';
import { setCurrentUser, resetCurrentUser } from './state/user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'https://ds-test-api.herokuapp.com';
  private currentUserSubject: BehaviorSubject<any>;
  private currentUser: Observable<User>;
  user$: Observable<User[]>;

  constructor(
    private http: HttpClient,
    private store: Store<{ user: User[] }>
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.user$ = store.select('user');
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email, password) {
    return this.http
      .post<User>(`${this.apiUrl}/api/login`, { email, password })
      .pipe(
        map((user: User) => {
          console.log('USER IN SERVICE ', user);

          this.store.dispatch(setCurrentUser({ user }));
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
