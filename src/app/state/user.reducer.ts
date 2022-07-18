import { createReducer, on } from '@ngrx/store';
import {
  getCurrentUser,
  resetCurrentUser,
  getAdminUsersSuccess,
  setAssestmentsSuccess,
  getCurrentUserSuccess,
  getAssestmentReportSuccess,
  getCurrentUserFailure,
  getAssestmentReport,
} from './user.actions';
import { AppState } from './app.state';

export const initialState: AppState = {
  currentUser: null,
  assessments: null,
  users: null,
  report: null,
  loading: null,
  loginError: null,
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

  on(getCurrentUserFailure, (state, action) => {
    return {
      ...state,
      loginError: true,
      loading: null,
    };
  }),

  on(resetCurrentUser, (state) => {
    return {
      currentUser: null,
      assessments: null,
      users: null,
      report: null,
      loading: null,
      loginError: null,
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

  on(getAssestmentReport, (state, action) => {
    return {
      ...state,
      report: null,
    };
  }),

  on(getAssestmentReportSuccess, (state, action) => {
    return {
      ...state,
      report: action.payload,
    };
  })
);
