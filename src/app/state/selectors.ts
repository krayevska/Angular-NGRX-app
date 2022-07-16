import { createSelector } from '@ngrx/store';
import { Assessment, CurrentUser } from '../interfaces';
import { AppState } from './app.state';

export function getState(state: any): AppState {
  return state.data;
}

export function fetchCurrentUser(state: any): CurrentUser {
  return state.currentUser;
}

export function fetchAssestments(state: any): Assessment[] {
  return state.assessments;
}

export function fetchUsers(state: any): CurrentUser {
  return state.users;
}

export const currentUserSelector = createSelector(getState, fetchCurrentUser);
export const assessmentsSelector = createSelector(getState, fetchAssestments);
export const usersSelector = createSelector(getState, fetchUsers);
