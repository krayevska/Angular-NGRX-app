import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentUser } from './interfaces';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private AUTH_HEADER = 'X-Token';
  private token: string;

  constructor(private localStorageService: LocalStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = this.addAuthenticationToken(request);
    return next.handle(request);
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    if (request.url.includes('login')) {
      return request;
    }
    this.token = this.localStorageService.getCurrentToken();
    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, this.token),
    });
  }
}
