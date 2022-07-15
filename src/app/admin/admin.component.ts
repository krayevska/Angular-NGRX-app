import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { AdminUser, CurrentUser } from '../interfaces';
import { AppState } from '../state/app.state';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users: AdminUser[];
  adminUsers$: Observable<AdminUser[]> = this.store.select(
    (state) => state.adminUsers
  );

  constructor(
    private dataService: DataService,
    private store: Store<{ adminUsers: AdminUser[] }>
  ) {
    //this.data$ = store.select('user');
  }

  public displayedColumns: string[] = ['first_name', 'last-name', 'email'];

  ngOnInit(): void {
    this.store.dispatch({ type: '[Admin Page] Get Admin users' });
    this.adminUsers$.subscribe((users) => {
      console.log('USERS ', users);
      this.users = users;
    });
  }
}
