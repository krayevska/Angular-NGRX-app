import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { DataService } from '../data.service';
import { LoginAction, ReportAction } from '../interfaces';
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
      switchMap((action: LoginAction) => {
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
            catchError((error): Observable<any> => {
              return of({ type: '[Login Component] Get current User Failure' });
            })
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
      ofType('[Admin Page] Get users'),
      mergeMap(() =>
        this.dataService.getAllUsers().pipe(
          map((users) => ({
            type: '[Admin Page] Get users Success',
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
      ofType('[Dashboard Component] Get Assestments'),
      mergeMap(() =>
        this.dataService.getUserAssessments().pipe(
          map((assessments) => ({
            type: '[Dashboard Component] Get Assestments Success',
            payload: assessments,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}

@Injectable()
export class ReportEffect {
  constructor(private actions$: Actions, private dataService: DataService) {}

  loadReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Dashboard Component] Get Assestment Report'),
      switchMap((action: ReportAction) => {
        return this.dataService.getUserAssessmentsReport(action.payload).pipe(
          map((report) => {
            return {
              type: '[Dashboard Component] Get Assestment Report Success',
              payload: report,
            };
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );
}
