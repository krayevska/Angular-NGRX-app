import { AdminUser, Assessment, CurrentUser, Report } from '../interfaces';

export interface AppState {
  currentUser: CurrentUser;
  assessments: Assessment[];
  users: AdminUser[];
  report: Report;
}
