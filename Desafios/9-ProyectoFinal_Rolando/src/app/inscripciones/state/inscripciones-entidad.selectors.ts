import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InscripcionEntidad } from '../interfaces/inscripcion-entidad';
import * as fromInscripcionesEntidad from './inscripciones-entidad.reducer';


export const selectInscripcionesEntidadState = createFeatureSelector<fromInscripcionesEntidad.InscripcionesEntidadState>(
  fromInscripcionesEntidad.inscripcionesEntidadFeatureKey
);




export const selectInscripcionesEntidadLoading = createSelector(
  selectInscripcionesEntidadState,
  (state: fromInscripcionesEntidad.InscripcionesEntidadState) => state.loading
);


export const selectInscripcionesEntidad = createSelector(
  selectInscripcionesEntidadState,
  (state: fromInscripcionesEntidad.InscripcionesEntidadState) => state.inscripciones
);




export const selectInscripcionEntidad = (inscripcionId: string) => createSelector(
  selectInscripcionesEntidad,
  (inscripciones: InscripcionEntidad[]) => {
    return inscripciones.filter(u => u.id == inscripcionId)[0]
  }
);



