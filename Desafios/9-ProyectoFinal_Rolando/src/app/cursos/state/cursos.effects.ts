import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CursosActions from './cursos.actions';
import { CursosService } from '../services/cursos.service';
import { Curso } from '../interfaces/curso';


@Injectable()
export class CursosEffects {

 constructor(
  private actions$: Actions,
  private cursosService: CursosService
  ) {}


  loadAPICursos$ = createEffect(() => {
    return this.actions$.pipe(ofType(CursosActions.loadCursos),

      concatMap(() => this.cursosService.getCursos().pipe(
          map((cursos: Curso[]) =>
          CursosActions.loadCursosSuccess({ cursos })),
          catchError(error => of(CursosActions.loadCursosFailure({ error }))))
      )
    );
  });


  addAPICurso$ = createEffect(() => {
    return this.actions$.pipe(ofType(CursosActions.addCurso),
      concatMap((action) => this.cursosService.addCurso(action.curso).pipe(
          map((curso: Curso) => CursosActions.loadCursos()),
          catchError(error => of(CursosActions.loadCursosFailure({ error })))
        )
      )
    );
  });

  editAPICurso$ = createEffect(() => {
    return this.actions$.pipe(ofType(CursosActions.editCurso),
      concatMap((action) => this.cursosService.editCurso(action.curso).pipe(
          map((curso: Curso) => CursosActions.loadCursos()),
          catchError(error => of(CursosActions.loadCursosFailure({ error })))
        )
      )
    );
  });

  deleteAPICurso$ = createEffect(() => {
    return this.actions$.pipe(ofType(CursosActions.deleteCurso),
      concatMap((action) => this.cursosService.deleteCurso(action.id).pipe(
          map(() => CursosActions.loadCursos()),
          catchError(error => of(CursosActions.loadCursosFailure({ error })))
        )
      )
    );
  });



}


