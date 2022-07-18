import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { DataService } from '../data.service';
import { Assessment, Report } from '../interfaces';
import { Observable } from 'rxjs';
import { CurrentUser } from '../interfaces';
import { select, Store } from '@ngrx/store';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AppState } from '../state/app.state';
import {
  assessmentsSelector,
  assessmentReportSelector,
} from '../state/selectors';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  public userAssessments: Assessment[];
  data$: Observable<CurrentUser>;
  public displayedColumns: string[] = [
    'id',
    'name',
    'active',
    'users_resolved',
  ];
  public displayedColumnsWithExpand: string[] = [
    ...this.displayedColumns,
    'expand',
  ];
  public expandedElement: Assessment | null;
  public report: Report;

  constructor(
    private dataService: DataService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch({
      type: '[Dashboard Component] Set Assestments',
    });

    this.store.pipe(select(assessmentsSelector)).subscribe((assessments) => {
      this.userAssessments = assessments;
    });
    this.store.pipe(select(assessmentReportSelector)).subscribe((report) => {
      this.report = report;
    });
  }

  getReport(id: number): void {
    this.store.dispatch({
      type: '[Dashboard Component] Get Assestment Report',
      payload: { id },
    });

    // this.store.pipe(select(assessmentReportSelector)).subscribe((report) => {
    //   this.report = report;
    // });
  }
}
