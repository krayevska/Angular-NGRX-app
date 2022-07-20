import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { LocalStorageService } from '../../services/local-storage.service';
import { AppState } from '../../state/app.state';
import * as actions from '../../state/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public onDashboard: boolean;
  public onAdminPage: boolean;
  public notOnLoginPage: boolean;
  public onAboutPage: boolean;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        const activeRoute = event.url;
        this.setButtonsConditionals(activeRoute);
      }
    });
  }

  setButtonsConditionals(route: string): void {
    this.onDashboard = route === '/';
    this.onAdminPage = route === '/admin';
    this.notOnLoginPage = route !== '/login';
    this.onAboutPage = route === '/about';
  }

  ngOnInit(): void {}

  goToAdminPanel() {
    this.router.navigateByUrl('/admin');
  }

  goToDashboard(): void {
    this.router.navigate(['']);
  }

  goToAboutPage(): void {
    this.router.navigate(['/about']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout() {
    this.localStorageService.clearLocalStorage();
    this.store.dispatch(actions.resetCurrentUser());
    // move to Effect?
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    return this.localStorageService.getCurrentUsersRole() === 'Admin';
  }

  isUserLogedIn(): boolean {
    return this.localStorageService.getCurrentUser() ? true : false;
  }
}
