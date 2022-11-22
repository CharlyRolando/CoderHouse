import { createAction, props } from '@ngrx/store';
import { InscripcionEntidad } from '../interfaces/inscripcion-entidad';



export const loadInscripcionesEntidad = createAction(
  '[InscripcionesEntidad] Load InscripcionesEntidad'
);

export const loadInscripcionesEntidadSuccess = createAction(
  '[InscripcionesEntidad] Load InscripcionesEntidad Success',
  props<{ inscripciones: InscripcionEntidad[] }>()
);

export const loadInscripcionesEntidadFailure = createAction(
  '[InscripcionesEntidad] Load InscripcionesEntidad Failure',
  props<{ error: any }>()
);



export const addInscripcionEntidad = createAction(
  '[InscripcionesEntidad] Add InscripcionEntidad',
  props<{inscripcion: InscripcionEntidad}>()
 );

 export const editInscripcionEntidad = createAction(
   '[InscripcionesEntidad] Edit InscripcionEntidad',
   props<{inscripcion: InscripcionEntidad}>()
 );

 export const deleteInscripcionEntidad = createAction(
   '[InscripcionesEntidad] Delete InscripcionEntidad',
   props<{id: string}>()
 );



