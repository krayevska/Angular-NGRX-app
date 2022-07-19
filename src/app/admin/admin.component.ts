import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { User } from '../interfaces';
import { AppState } from '../state/app.state';
import { usersSelector } from '../state/selectors';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users: User[];

  constructor(private store: Store<AppState>) {}

  public displayedColumns: string[] = [
    'first_name',
    'last-name',
    'email',
    'csv',
  ];

  ngOnInit(): void {
    this.store.dispatch({ type: '[Admin Page] Get users' });
    this.store.pipe(select(usersSelector)).subscribe((users: any) => {
      this.users = users;
    });
  }

  getCsv(user): void {
    const data: Blob = new Blob([JSON.stringify(user)], {
      type: 'text/plain',
    });
    saveAs(data, 'user.csv');
  }
}
