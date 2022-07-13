import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../data.service';
import { Assessment } from '../interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public userAssessments: Assessment[];

  constructor(private dataService: DataService) {}

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
}
