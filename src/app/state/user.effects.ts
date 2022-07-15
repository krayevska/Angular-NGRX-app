import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { DataService } from '../data.service';

@Injectable()
export class UsersEffect {
  constructor(private actions$: Actions, private dataService: DataService) {}

  loadMovies$ = createEffect(() =>
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
