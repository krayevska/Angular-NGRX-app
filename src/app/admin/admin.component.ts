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
    this.store.dispatch({ type: '[Admin Page] Get Admin users' });
    this.store.pipe(select(usersSelector)).subscribe((users: any) => {
      this.users = users;
      console.log('THIS USERS ', this.users);
    });
  }

  getCsv(user): void {
    console.log('USER ', user);
    let userStr = JSON.stringify(user);
    console.log('USER STRING ', userStr);
    const data: Blob = new Blob([userStr], {
      type: 'text/csv;charset=utf-8',
    });
    console.log('DATA BLOB ', data);
    saveAs(data, 'user.csv');
  }
}
