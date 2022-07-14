import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { DataService } from '../data.service';
import { Assessment } from '../interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public userAssessments: Assessment[];

  constructor(
    private dataService: DataService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataService.getUserAssessments().subscribe((list) => {
      console.log('LIST ', list);
      this.userAssessments = list;
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
