import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as InscripcionesActions from './inscripciones.actions';
import { InscripcionesService } from '../services/inscripciones.service';
import { Inscripcion } from '../interfaces/inscripcion';


@Injectable()
export class InscripcionesEffects {

  constructor(
    private actions$: Actions,
    private inscripcionesService: InscripcionesService
  ) { }


  loadAPIInscripciones$ = createEffect(() => {
    return this.actions$.pipe(ofType(InscripcionesActions.loadInscripciones),
      concatMap(() => this.inscripcionesService.getInscripciones().pipe(
        map((inscripciones: Inscripcion[]) =>
          InscripcionesActions.loadInscripcionesSuccess({ inscripciones })
        ),
        catchError(error => of(InscripcionesActions.loadInscripcionesFailure({ error }))))
      )
    );
  });



  addAPIInscripcion$ = createEffect(() => {
    return this.actions$.pipe(ofType(InscripcionesActions.addInscripcion),
      concatMap((action) => this.inscripcionesService.addInscripcion(action.inscripcion).pipe(
        map((inscripcion: Inscripcion) => InscripcionesActions.loadInscripciones()),
        catchError(error => of(InscripcionesActions.loadInscripcionesFailure({ error })))
      )
      )
    );
  });

  editAPIInscripcion$ = createEffect(() => {
    return this.actions$.pipe(ofType(InscripcionesActions.editInscripcion),
      concatMap((action) => this.inscripcionesService.editInscripcion(action.inscripcion).pipe(
        map((inscripcion: Inscripcion) => InscripcionesActions.loadInscripciones()),
        catchError(error => of(InscripcionesActions.loadInscripcionesFailure({ error })))
      )
      )
    );
  });

  deleteAPIInscripcion$ = createEffect(() => {
    return this.actions$.pipe(ofType(InscripcionesActions.deleteInscripcion),
      concatMap((action) => this.inscripcionesService.deleteInscripcion(action.id).pipe(
        map(() => InscripcionesActions.loadInscripciones()),
        catchError(error => of(InscripcionesActions.loadInscripcionesFailure({ error })))
      )
      )
    );
  });



}
