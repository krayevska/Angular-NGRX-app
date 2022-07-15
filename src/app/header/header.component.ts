import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public admin = true;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  getAllUsers() {
    console.log('getAllUsers');
    this.router.navigateByUrl('/admin');
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
