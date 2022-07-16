import { createReducer, on } from '@ngrx/store';
import {
  getCurrentUser,
  resetCurrentUser,
  setAssestments,
  getAdminUsersSuccess,
  setAssestmentsSuccess,
  getCurrentUserSuccess,
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
};

export const dataReducer = createReducer(
  initialState,
  on(getCurrentUserSuccess, (state, action) => ({
    ...state,
    currentUser: action.payload,
  })),
  //on(resetCurrentUser, (state) => null),
  on(resetCurrentUser, (state) => {
    return {
      currentUser: null,
      assessments: null,
      users: null,
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
