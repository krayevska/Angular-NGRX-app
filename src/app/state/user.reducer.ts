import { createReducer, on } from '@ngrx/store';
import {
  getCurrentUser,
  resetCurrentUser,
  setAssestments,
  getAdminUsersSuccess,
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
  user: null,
  assessments: null,
  adminUsers: null,
};

export const dataReducer = createReducer(
  initialState,
  on(getCurrentUser, (state, action) => ({
    ...state,
    user: action.user,
  })),
  on(resetCurrentUser, (state) => null),
  on(setAssestments, (state, action) => ({
    ...state,
    assessments: action.assessments,
  })),
  on(getAdminUsersSuccess, (state, action) => {
    return {
      ...state,
      adminUsers: action.payload,
    };
  })
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
