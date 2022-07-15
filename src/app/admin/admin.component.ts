import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { AdminUser, User } from '../interfaces';
import { AppState } from '../state/app.state';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  data$: Observable<User>;
  constructor(
    private dataService: DataService,
    private store: Store<AppState>
  ) {
    this.data$ = store.select('user');
  }

  public users: AdminUser[];
  public displayedColumns: string[] = ['first_name', 'last-name', 'email'];

  ngOnInit(): void {
    this.dataService.getAllUsers().subscribe((users) => {
      this.users = users;
      this.data$.subscribe((data) => {
        console.log(' DATA FROM STORE ADMIN ', data);
      });
    });
  }
}
