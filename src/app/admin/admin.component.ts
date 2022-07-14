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

  ngOnInit(): void {
    this.dataService.getAllUsers().subscribe((users) => {
      this.users = users;
      console.log('USERS FROM ADMIN', users);
    });
  }
}
