import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticationService } from '../authentication.service';
import { CurrentUser } from '../interfaces';
import { LocalStorageService } from '../local-storage.service';
import { AppState } from '../state/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public admin = true;
  public activeRoute: string;
  public currentUser = this.localStorageService.getCurrentUser();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.activeRoute = event.url;
      }
    });
  }

  ngOnInit(): void {}

  goToAdminPanel() {
    this.router.navigateByUrl('/admin');
  }

  logout() {
    this.currentUser = null;
    this.localStorageService.clearLocalStorage();
    this.store.dispatch({ type: '[Login Component] Reset Current User' });
    this.router.navigate(['/login']);
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

  onHomePage(): boolean {
    return this.activeRoute === '/';
  }

  onAdminPage(): boolean {
    return this.activeRoute === '/admin';
  }

  isAdmin(): boolean {
    return this.currentUser.role === 'Admin';
  }

  notOnLoginPage(): boolean {
    return this.activeRoute !== '/login';
  }

  onAboutPage(): boolean {
    return this.activeRoute === '/about';
  }

  userLogedIn(): boolean {
    this.currentUser = this.localStorageService.getCurrentUser();
    if (this.currentUser) {
      return true;
    }
    return false;
  }
}
