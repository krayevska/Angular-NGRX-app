import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { DataService } from '../data.service';
import { Assessment } from '../interfaces';
import { Observable } from 'rxjs';
import { User } from '../interfaces';
import { Store } from '@ngrx/store';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

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
  user$: Observable<User[]>;
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
