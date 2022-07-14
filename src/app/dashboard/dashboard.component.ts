import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { DataService } from '../data.service';
import { Assessment } from '../interfaces';
import { Observable } from 'rxjs';
import { User } from '../interfaces';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public userAssessments: Assessment[];
  user$: Observable<User[]>;

  constructor(
    private dataService: DataService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private store: Store<{ user: User[] }>
  ) {
    this.user$ = store.select('user');
  }

  ngOnInit(): void {
    this.dataService.getUserAssessments().subscribe((list) => {
      console.log('LIST ', list);
      this.userAssessments = list;
      this.user$.subscribe((user) => {
        console.log(' USERUSER ', user);
      });
    });
  }

  getReport(id: number): void {
    this.dataService.getUserAssessmentsReport(id).subscribe((report) => {
      console.log('REPORT ', report);
    });
  }

  getAllUsers() {
    this.dataService.getAllUsers().subscribe((users) => {
      console.log('USERS ', users);
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
