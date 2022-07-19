import { Component, OnInit } from '@angular/core';
import { Assessment, Report, CurrentUser } from '../../models/interfaces';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AppState } from '../../state/app.state';
import {
  assessmentsSelector,
  assessmentReportSelector,
} from '../../state/selectors';

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

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch({
      type: '[Dashboard Component] Get Assestments',
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
  }
}
