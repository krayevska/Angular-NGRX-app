import { AdminUser, Assessment, User } from '../interfaces';

export interface AppState {
  user: User;
  assessments: Assessment[];
  adminUsers: AdminUser[];
}
