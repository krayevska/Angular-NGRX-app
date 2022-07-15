import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public admin = true;
  public activeRoute: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
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
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  goToDashboard(): void {
    this.router.navigate(['']);
  }

  goToAboutPage(): void {
    console.log('GO TO ABOUT');
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

  notOnLoginPage(): boolean {
    return this.activeRoute !== '/login';
  }

  onAboutPage(): boolean {
    return this.activeRoute === '/about';
  }

  userLogedIn(): boolean {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      return true;
    }
    return false;
  }
}
