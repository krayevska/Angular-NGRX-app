import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../models/interfaces';
import { AppState } from '../../state/app.state';
import { usersSelector } from '../../state/selectors';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { DISPLAYED_COLUMNS } from '../../models/constatns';
import * as actions from 'src/app/state/user.actions';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users$: Observable<User[]> = this.store.select(usersSelector);
  public displayedColumns = DISPLAYED_COLUMNS;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(actions.getUsers());
  }

  getCsv(user): void {
    const data: Blob = new Blob([JSON.stringify(user)], {
      type: 'text/plain',
    });
    saveAs(data, 'user.csv');
  }
}
