import { createAction, props } from '@ngrx/store';
import { User, Assessment, CurrentUser, Report } from '../models/interfaces';

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

export const getAssestments = createAction(
  '[Dashboard Component] Get Assestments'
);

export const getAssestmentsSuccess = createAction(
  '[Dashboard Component] Get Assestments Success',
  props<{ payload: Assessment[] }>()
);

export const getUsers = createAction('[Admin Page] Get users');

export const getUsersSuccess = createAction(
  '[Admin Page] Get users Success',
  props<{ payload: User[] }>()
);
