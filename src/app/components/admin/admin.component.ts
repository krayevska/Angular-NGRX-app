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

  getCsv(users: User[]): void {
    // const csvString = users.reduce((array: any, item: any, index: any) => {
    //   if (index === 0) {
    //     array.push(Object.keys(item));
    //   }
    //   array.push(
    //     Object.values(item).map((i) =>
    //       Array.isArray(i) ? JSON.stringify(i) : i
    //     )
    //   );
    //   return array;
    // }, []);
    // console.log('csvString ', csvString);

    const headings = Object.keys(users[0]);

    const csvString = [
      headings,
      ...users.map((item) => {
        let userData = [];
        headings.forEach((heading) => {
          userData.push(JSON.stringify(item[heading]));
        });
        return userData;
      }),
    ]
      .map((item) => item.join(','))
      .join('\n');

    const dataToSave: Blob = new Blob([csvString], {
      type: 'text/csv',
    });
    saveAs(dataToSave, 'users.csv');
  }
}
