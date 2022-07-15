import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { CurrentUser } from './interfaces';
import { Store } from '@ngrx/store';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private AUTH_HEADER = 'X-Token';
  private userData: CurrentUser;
  private token: string;
  user$: Observable<CurrentUser[]>;

  constructor(private store: Store<{ user: CurrentUser[] }>) {
    this.user$ = store.select('user');
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('INTERCEPTER');
    request = this.addAuthenticationToken(request);
    return next.handle(request);
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    console.log('REQUEST ', request);
    if (request.url.includes('login')) {
      return request;
    }
    console.log('REQUEST with TOKEN', request);
    this.userData = JSON.parse(localStorage.getItem('currentUser'));
    this.token = this.userData.token;
    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, this.token),
    });
  }
}
