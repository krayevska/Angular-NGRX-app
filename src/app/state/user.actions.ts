import { createAction, props } from '@ngrx/store';
import { AdminUser, Assessment, CurrentUser } from '../interfaces';

export const getCurrentUser = createAction(
  '[Login Component] Set current User',
  props<{ user: CurrentUser }>()
);

export const resetCurrentUser = createAction(
  '[Login Component] Reset Current User'
);

export const setAssestments = createAction(
  '[Dashboard Component] Set Assestments',
  props<{ assessments: Assessment[] }>()
);

export const getAdminUsers = createAction('[Admin Page] Get Admin users');

export const getAdminUsersSuccess = createAction(
  '[Admin Page] Get Admin users Success',
  props<{ payload: AdminUser[] }>()
);
