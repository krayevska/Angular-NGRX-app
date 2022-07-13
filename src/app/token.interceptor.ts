import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private AUTH_HEADER = 'X-Token';
  // private userData = JSON.parse(localStorage.getItem('currentUser'));
  // private token = this.userData.token;

  constructor() {}

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
    if (request.method === 'POST') {
      return request;
    }
    let userData = JSON.parse(localStorage.getItem('currentUser'));
    let token = userData.token;
    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, token),
    });
  }
}
