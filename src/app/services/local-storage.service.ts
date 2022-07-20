import { Injectable } from '@angular/core';
import { CurrentUser } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setCurrentUser(user: CurrentUser): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): CurrentUser {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  getCurrentUsersRole(): string {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user.role;
  }

  getCurrentToken(): string {
    let user = this.getCurrentUser();
    return user.token;
  }

  clearLocalStorage(): void {
    localStorage.removeItem('currentUser');
  }
}
