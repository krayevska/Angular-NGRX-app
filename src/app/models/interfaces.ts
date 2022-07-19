import { Action } from '@ngrx/store';

export interface CurrentUser {
  first_name: string;
  last_name: string;
  role: string;
  token: string;
}

export interface User {
  email: string;
  first_name: string;
  groups: string[];
  last_name: string;
}

export interface Assessment {
  id: number;
  name: string;
  users_resolved: number;
  active: boolean;
  image_url: string;
}

export interface Report {
  data: {
    Agreeableness: number;
    Drive: number;
    Luck: number;
    Openess: number;
  };
  type: string;
}

export interface LoginAction extends Action {
  type: string;
  email: any;
  password: any;
}

// export interface LoginAction extends Action {
//   type: string;
//   payload: {
//     email: any;
//     password: any;
//   };
// }

export interface ReportAction extends Action {
  type: string;
  payload: number;
}
