import { AdminUser, Assessment, CurrentUser } from '../interfaces';

export interface AppState {
  user: CurrentUser;
  assessments: Assessment[];
  adminUsers: AdminUser[];
}
