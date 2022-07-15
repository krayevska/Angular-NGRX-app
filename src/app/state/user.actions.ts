import { createAction, props } from '@ngrx/store';
import { User } from '../interfaces';

export const setCurrentUser = createAction(
  '[Login Component] Set current User',
  props<{ user: User }>()
);

export const resetCurrentUser = createAction(
  '[Login Component] Reset Current User'
);
