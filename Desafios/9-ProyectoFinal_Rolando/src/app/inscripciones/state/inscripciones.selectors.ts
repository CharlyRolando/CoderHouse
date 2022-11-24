import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Inscripcion } from '../interfaces/inscripcion';
import * as fromInscripciones from './inscripciones.reducer';


export const selectInscripcionesState = createFeatureSelector<fromInscripciones.InscripcionesState>(
  fromInscripciones.inscripcionesFeatureKey
);


export const selectInscripcionesLoading = createSelector(
  selectInscripcionesState,
  (state: fromInscripciones.InscripcionesState) => state.loading
);


export const selectInscripciones = createSelector(
  selectInscripcionesState,
  (state: fromInscripciones.InscripcionesState) => state.inscripciones
);


export const selectInscripcion = (inscripcionId: string) => createSelector(
  selectInscripciones,
  (inscripciones: Inscripcion[]) => {
    return inscripciones.filter(u => u.id == inscripcionId)[0]
  }
);



