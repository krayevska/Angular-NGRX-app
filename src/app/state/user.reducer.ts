import { createReducer, on } from '@ngrx/store';
import { setCurrentUser, resetCurrentUser } from './user.actions';
import { User } from '../interfaces';

export const initialState: User[] = [];

export const userReducer = createReducer(
  initialState,
  on(setCurrentUser, (state, { user }) => {
    console.log('USER FROM REDUSER ', user);
    return user;
  }),
  on(resetCurrentUser, (state) => [])
);
