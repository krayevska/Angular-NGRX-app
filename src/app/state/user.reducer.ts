import { createReducer, on } from '@ngrx/store';
import {
  getCurrentUser,
  resetCurrentUser,
  setAssestments,
  getAdminUsersSuccess,
  setAssestmentsSuccess,
  getCurrentUserSuccess,
  getAssestmentReportSuccess,
} from './user.actions';
import { Assessment, CurrentUser } from '../interfaces';
import { AppState } from './app.state';
import { state } from '@angular/animations';

//export const initialState: User | null = null;
// export interface AppState {
//   user: User;
//   assessments: Assessment;
// }

export const initialState: AppState = {
  currentUser: null,
  assessments: null,
  users: null,
  report: null,
  loading: null,
};

export const dataReducer = createReducer(
  initialState,

  on(getCurrentUser, (state, action) => ({
    ...state,
    loading: true,
  })),
  on(getCurrentUserSuccess, (state, action) => ({
    ...state,
    currentUser: action.payload,
    loading: null,
  })),

  on(resetCurrentUser, (state) => {
    return {
      currentUser: null,
      assessments: null,
      users: null,
      report: null,
      loading: null,
    };
  }),
  on(setAssestmentsSuccess, (state, action) => ({
    ...state,
    assessments: action.payload,
  })),
  on(getAdminUsersSuccess, (state, action) => {
    return {
      ...state,
      users: action.payload,
    };
  }),

  on(getAssestmentReportSuccess, (state, action) => {
    return {
      ...state,
      report: action.payload,
    };
  })
);
