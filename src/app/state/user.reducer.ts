import { createReducer, on } from '@ngrx/store';
import {
  setCurrentUser,
  resetCurrentUser,
  setAssestments,
  setAllUsers,
} from './user.actions';
import { Assessment, User } from '../interfaces';
import { AppState } from './app.state';
import { state } from '@angular/animations';

//export const initialState: User | null = null;
// export interface AppState {
//   user: User;
//   assessments: Assessment;
// }

export const initialState: AppState = {
  user: null,
  assessments: null,
  adminUsers: null,
};

export const dataReducer = createReducer(
  initialState,
  on(setCurrentUser, (state, action) => ({
    ...state,
    user: action.user,
  })),
  on(resetCurrentUser, (state) => null),
  on(setAssestments, (state, action) => ({
    ...state,
    assessments: action.assessments,
  })),
  on(setAllUsers, (state, action) => ({
    ...state,
    adminUsers: action.adminUsers,
  }))
);

// export const assestmentsReducer = createReducer(
//   initialState,
//   on(setAssestments, (state, action) => ({
//     ...state,
//     assessments: action.assessments,
//   }))
// );

// export const adminUsersReducer = createReducer(
//   initialState,
//   on(setAllUsers, (state, action) => ({
//     ...state,
//     adminUsers: action.adminUsers,
//   }))
// );
