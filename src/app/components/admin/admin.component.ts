import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../models/interfaces';
import { AppState } from '../../state/app.state';
import { usersSelector } from '../../state/selectors';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { DISPLAYED_COLUMNS_ADMIN } from '../../models/constatns';
import * as actions from 'src/app/state/user.actions';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  private allUsers: User[];
  public displayedColumns = DISPLAYED_COLUMNS_ADMIN;

  users$: Observable<User[]> = this.store
    .select(usersSelector)
    .pipe(tap((users) => (this.allUsers = users)));

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(actions.getUsers());
  }

  getCsv(data: User | User[]): void {
    const dataToSave: Blob = new Blob([JSON.stringify(data)], {
      type: 'text/plain',
    });
    saveAs(dataToSave, 'data.csv');
  }
}
