import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as InscripcionesEntidadActions from './inscripciones-entidad.actions';
import { InscripcionesEntidadService } from '../services/inscripciones-entidad.service';
import { InscripcionEntidad } from '../interfaces/inscripcion-entidad';


@Injectable()
export class InscripcionesEntidadEffects {

  constructor(
    private actions$: Actions,
    private inscripcionesEntidadService: InscripcionesEntidadService
  ) { }


  loadAPIInscripcionesEntidad$ = createEffect(() => {
    return this.actions$.pipe(ofType(InscripcionesEntidadActions.loadInscripcionesEntidad),
      concatMap(() => this.inscripcionesEntidadService.getInscripcionesEntidad().pipe(
        map((inscripciones: InscripcionEntidad[]) =>
          InscripcionesEntidadActions.loadInscripcionesEntidadSuccess({ inscripciones })
        ),
        catchError(error => of(InscripcionesEntidadActions.loadInscripcionesEntidadFailure({ error }))))
      )
    );
  });



  addAPIInscripcionEntidad$ = createEffect(() => {
    return this.actions$.pipe(ofType(InscripcionesEntidadActions.addInscripcionEntidad),
      concatMap((action) => this.inscripcionesEntidadService.addInscripcionEntidad(action.inscripcion).pipe(
        map((inscripcion: InscripcionEntidad) => InscripcionesEntidadActions.loadInscripcionesEntidad()),
        catchError(error => of(InscripcionesEntidadActions.loadInscripcionesEntidadFailure({ error })))
      )
      )
    );
  });

  editAPIInscripcioEntidad$ = createEffect(() => {
    return this.actions$.pipe(ofType(InscripcionesEntidadActions.editInscripcionEntidad),
      concatMap((action) => this.inscripcionesEntidadService.editInscripcionEntidad(action.inscripcion).pipe(
        map((inscripcion: InscripcionEntidad) => InscripcionesEntidadActions.loadInscripcionesEntidad()),
        catchError(error => of(InscripcionesEntidadActions.loadInscripcionesEntidadFailure({ error })))
      )
      )
    );
  });

  deleteAPIInscripcionEntidad$ = createEffect(() => {
    return this.actions$.pipe(ofType(InscripcionesEntidadActions.deleteInscripcionEntidad),
      concatMap((action) => this.inscripcionesEntidadService.deleteInscripcionEntidad(action.id).pipe(
        map(() => InscripcionesEntidadActions.loadInscripcionesEntidad()),
        catchError(error => of(InscripcionesEntidadActions.loadInscripcionesEntidadFailure({ error })))
      )
      )
    );
  });



}
