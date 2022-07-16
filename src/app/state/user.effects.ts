import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { DataService } from '../data.service';
import { CustomAction } from '../interfaces';
import { LocalStorageService } from '../local-storage.service';

@Injectable()
export class CurrentUserEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private localStorageService: LocalStorageService
  ) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Login Component] Get current User'),
      switchMap((action: CustomAction) => {
        return this.authService
          .login(action.payload.email, action.payload.password)
          .pipe(
            map((user) => {
              this.localStorageService.setCurrentUser(user);
              return {
                type: '[Login Component] Get current User Success',
                payload: user,
              };
            }),
            catchError(() => EMPTY)
          );
      })
    )
  );
}

@Injectable()
export class UsersEffect {
  constructor(private actions$: Actions, private dataService: DataService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Admin Page] Get Admin users'),
      mergeMap(() =>
        this.dataService.getAllUsers().pipe(
          map((users) => ({
            type: '[Admin Page] Get Admin users Success',
            payload: users,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}

@Injectable()
export class UserAssestmentsEffect {
  constructor(private actions$: Actions, private dataService: DataService) {}

  loadAssestments$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Dashboard Component] Set Assestments'),
      mergeMap(() =>
        this.dataService.getUserAssessments().pipe(
          map((assessments) => ({
            type: '[Dashboard Component] Set Assestments Success',
            payload: assessments,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}