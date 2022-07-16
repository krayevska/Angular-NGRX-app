import { AdminUser, Assessment, CurrentUser } from '../interfaces';

export interface AppState {
  currentUser: CurrentUser;
  assessments: Assessment[];
  users: AdminUser[];
}
