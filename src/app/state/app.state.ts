import { User, Assessment, CurrentUser, Report } from '../models/interfaces';

export interface AppState {
  currentUser: CurrentUser;
  assessments: Assessment[];
  users: User[];
  report: Report;
  loading: boolean;
  loginError: boolean;
}
