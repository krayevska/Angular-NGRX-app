import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AdminUser } from '../interfaces';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(private dataService: DataService) {}

  public users: AdminUser[];
  public displayedColumns: string[] = ['first_name', 'last-name', 'email'];

  ngOnInit(): void {
    this.dataService.getAllUsers().subscribe((users) => {
      this.users = users;
      console.log('USERS FROM ADMIN', users);
    });
  }
}
