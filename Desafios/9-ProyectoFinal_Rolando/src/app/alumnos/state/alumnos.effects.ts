import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as AlumnosActions from './alumnos.actions';
import { AlumnosService } from '../services/alumnos.service';
import { Alumno } from '../interfaces/alumno';


@Injectable()
export class AlumnosEffects {

  constructor(
    private actions$: Actions,
    private alumnosService: AlumnosService
  ) {}


  loadAPIAlumnos$ = createEffect(() => {
    return this.actions$.pipe(ofType(AlumnosActions.loadAlumnos),

      concatMap(() => this.alumnosService.getAlumnos().pipe(
          map((alumnos: Alumno[]) => AlumnosActions.loadAlumnosSuccess({ alumnos })),
          catchError(error => of(AlumnosActions.loadAlumnosFailure({ error }))))
      )
    );
  });


  addAPIAlumno$ = createEffect(() => {
    return this.actions$.pipe(ofType(AlumnosActions.addAlumno),
      concatMap((action) => this.alumnosService.addAlumno(action.alumno).pipe(
          map((alumno: Alumno) => AlumnosActions.loadAlumnos()),
          catchError(error => of(AlumnosActions.loadAlumnosFailure({ error })))
        )
      )
    );
  });

  editAPIAlumno$ = createEffect(() => {
    return this.actions$.pipe(ofType(AlumnosActions.editAlumno),
      concatMap((action) => this.alumnosService.editAlumno(action.alumno).pipe(
          map((alumno: Alumno) => AlumnosActions.loadAlumnos()),
          catchError(error => of(AlumnosActions.loadAlumnosFailure({ error })))
        )
      )
    );
  });

  deleteAPIAlumno$ = createEffect(() => {
    return this.actions$.pipe(ofType(AlumnosActions.deleteAlumno),
      concatMap((action) => this.alumnosService.deleteAlumno(action.id).pipe(
          map(() => AlumnosActions.loadAlumnos()),
          catchError(error => of(AlumnosActions.loadAlumnosFailure({ error })))
        )
      )
    );
  });



}
