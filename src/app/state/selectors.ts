import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';

export function getState(state: any): AppState {
  return state.data;
}

export const currentUserSelector = createSelector(
  getState,
  (state) => state.currentUser
);
export const assessmentsSelector = createSelector(
  getState,
  (state) => state.assessments
);
export const usersSelector = createSelector(getState, (state) => state.users);
export const assessmentReportSelector = createSelector(
  getState,
  (state) => state.report
);
export const loadingtSelector = createSelector(
  getState,
  (state) => state.loading
);
export const errorSelector = createSelector(
  getState,
  (state) => state.loginError
);
