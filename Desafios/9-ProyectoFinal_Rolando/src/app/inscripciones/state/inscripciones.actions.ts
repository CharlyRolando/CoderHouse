import { createAction, props } from '@ngrx/store';
import { Inscripcion } from '../interfaces/inscripcion';



export const loadInscripciones = createAction(
  '[Inscripciones] Load Inscripciones'
);

export const loadInscripcionesSuccess = createAction(
  '[Inscripciones] Load Inscripciones Success',
  props<{ inscripciones: Inscripcion[] }>()
);

export const loadInscripcionesFailure = createAction(
  '[Inscripciones] Load Inscripciones Failure',
  props<{ error: any }>()
);



export const addInscripcion = createAction(
  '[Inscripciones] Add Inscripcion',
  props<{inscripcion: Inscripcion}>()
 );

 export const editInscripcion = createAction(
   '[Inscripciones] Edit Inscripcion',
   props<{inscripcion: Inscripcion}>()
 );

 export const deleteInscripcion = createAction(
   '[Inscripciones] Delete Inscripcion',
   props<{id: string}>()
 );



