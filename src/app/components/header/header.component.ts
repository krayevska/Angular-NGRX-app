import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CurrentUser, User } from '../../models/interfaces';
import { LocalStorageService } from '../../services/local-storage.service';
import { AppState } from '../../state/app.state';
import { currentUserSelector } from '../../state/selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public activeRoute: string;
  public currentUser: CurrentUser;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.activeRoute = event.url;
      }
    });
  }

  ngOnInit(): void {
    this.store.select(currentUserSelector).subscribe((user) => {
      this.currentUser = user;
    });
  }

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

  isAdmin(): boolean {
    return this.currentUser.role === 'Admin';
  }

  onHomePage(): boolean {
    return this.activeRoute === '/';
  }

  onAdminPage(): boolean {
    return this.activeRoute === '/admin';
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
