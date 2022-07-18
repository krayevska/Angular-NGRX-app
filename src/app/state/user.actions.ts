import { createAction, props } from '@ngrx/store';
import { User, Assessment, CurrentUser, Report } from '../interfaces';

export const getCurrentUser = createAction(
  '[Login Component] Get current User',
  props<{ email: string; password: string }>()
);

export const getCurrentUserSuccess = createAction(
  '[Login Component] Get current User Success',
  props<{ payload: CurrentUser }>()
);

export const getCurrentUserFailure = createAction(
  '[Login Component] Get current User Failure'
);

export const resetCurrentUser = createAction(
  '[Login Component] Reset Current User'
);

export const getAssestmentReport = createAction(
  '[Dashboard Component] Get Assestment Report',
  props<{ payload: number }>()
);

export const getAssestmentReportSuccess = createAction(
  '[Dashboard Component] Get Assestment Report Success',
  props<{ payload: Report }>()
);

export const setAssestments = createAction(
  '[Dashboard Component] Set Assestments'
);

export const setAssestmentsSuccess = createAction(
  '[Dashboard Component] Set Assestments Success',
  props<{ payload: Assessment[] }>()
);

export const getUsers = createAction('[Admin Page] Get users');

export const getUsersSuccess = createAction(
  '[Admin Page] Get users Success',
  props<{ payload: User[] }>()
);
