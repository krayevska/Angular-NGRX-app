import { createSelector } from '@ngrx/store';
import { Assessment, CurrentUser, Report, User } from '../models/interfaces';
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

export function fetchUsers(state: any): User[] {
  return state.users;
}

export function fetchReport(state: any): Report {
  return state.report;
}

export function fetchLoading(state: any): boolean {
  return state.loading;
}

export function fetchError(state: any): boolean {
  return state.loginError;
}

export const currentUserSelector = createSelector(getState, fetchCurrentUser);
export const assessmentsSelector = createSelector(getState, fetchAssestments);
export const usersSelector = createSelector(getState, fetchUsers);
export const assessmentReportSelector = createSelector(getState, fetchReport);
export const loadingtSelector = createSelector(getState, fetchLoading);
export const errorSelector = createSelector(getState, fetchError);
