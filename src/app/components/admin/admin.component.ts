import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';

import { User } from '../../models/interfaces';
import { AppState } from '../../state/app.state';
import { usersSelector } from '../../state/selectors';
import { DISPLAYED_COLUMNS_ADMIN } from '../../models/constatns';
import * as actions from 'src/app/state/user.actions';
import { convertToCsv } from '../../models/configFunctions';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public displayedColumns = DISPLAYED_COLUMNS_ADMIN;
  users$: Observable<User[]> = this.store.select(usersSelector);
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(actions.getUsers());
  }

  getCsv(users: User[]): void {
    const csvString = convertToCsv(users);
    const dataToSave: Blob = new Blob([csvString], {
      type: 'text/csv',
    });
    saveAs(dataToSave, 'users.csv');
  }
}
