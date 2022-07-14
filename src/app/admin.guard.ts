import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { User } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  private admin = true;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private store: Store<{ user: User[] }>
  ) {
    this.user$ = store.select('user');
  }

  user$: Observable<User[]>;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('ADMIN GUARD');
    if (this.admin) {
      console.log('ADMIN');
      return true;
    }

    this.router.navigate(['']);
    return false;
  }
}
