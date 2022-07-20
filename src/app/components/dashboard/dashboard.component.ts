import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Assessment, Report } from '../../models/interfaces';
import { AppState } from '../../state/app.state';
import {
  assessmentsSelector,
  assessmentReportSelector,
} from '../../state/selectors';
import {
  ANIMATION_CONFIGS,
  DISPLAYED_COLUMNS_DASHBOARD,
} from '../../models/constatns';
import * as actions from 'src/app/state/user.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: ANIMATION_CONFIGS,
})
export class DashboardComponent implements OnInit {
  public userAssessments: Assessment[];
  public displayedColumns = DISPLAYED_COLUMNS_DASHBOARD;
  public displayedColumnsWithExpand: string[] = [
    ...this.displayedColumns,
    'expand',
  ];
  public expandedElement: Assessment | null;
  public report: Report;

  assessments$: Observable<Assessment[]> =
    this.store.select(assessmentsSelector);

  report$: Observable<Report> = this.store
    .select(assessmentReportSelector)
    .pipe(
      tap((report) => {
        this.report = report;
      })
    );

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(actions.getAssestments());
    //this.assessments$ = this.store.select(assessmentsSelector);
  }

  getReport(id: number): void {
    this.store.dispatch(actions.getAssestmentReport({ payload: id }));
  }
}
