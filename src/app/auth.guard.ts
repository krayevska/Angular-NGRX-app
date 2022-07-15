import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { CurrentUser } from './interfaces';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private store: Store<{ user: CurrentUser[] }>
  ) {
    this.user$ = store.select('user');
  }

  user$: Observable<CurrentUser[]>;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      return true;
    }
    console.log('GUARD redirect to LOGIN');
    this.router.navigate(['/login']);
    return false;
  }
}
