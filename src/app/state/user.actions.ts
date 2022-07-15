import { createAction, props } from '@ngrx/store';
import { AdminUser, Assessment, User } from '../interfaces';

export const setCurrentUser = createAction(
  '[Login Component] Set current User',
  props<{ user: User }>()
);

export const resetCurrentUser = createAction(
  '[Login Component] Reset Current User'
);

export const setAssestments = createAction(
  '[Dashboard Component] Set Assestments',
  props<{ assessments: Assessment[] }>()
);

export const setAllUsers = createAction(
  '[Admin Component] Set All Users',
  props<{ adminUsers: AdminUser[] }>()
);
