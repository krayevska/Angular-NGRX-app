import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public admin = true;
  constructor() {}

  ngOnInit(): void {}

  getAllUsers() {
    console.log('getAllUsers');
  }
  logout() {
    console.log('logout');
  }
}
