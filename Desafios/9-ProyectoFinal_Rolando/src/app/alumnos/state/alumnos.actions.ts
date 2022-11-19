import { createAction, props } from '@ngrx/store';
import { Alumno } from "../interfaces/alumno";


export const loadAlumnos = createAction(
  '[Alumnos] Load Alumnos'
);

export const loadAlumnosSuccess = createAction(
  '[Alumnos] Load Alumnos Success',
  props<{ alumnos: Alumno[]}>()
);

export const loadAlumnosFailure = createAction(
  '[Alumnos] Load Alumnos Failure',
  props<{ error: any }>()
)


export const addAlumno = createAction(
 '[Alumnos] Add Alumno',
 props<{alumno: Alumno}>()
);

export const editAlumno = createAction(
  '[Alumnos] Edit Alumno',
  props<{alumno:Alumno}>()
);

export const deleteAlumno = createAction(
  '[Alumnos] Delete Alumno',
  props<{id: string}>()
);



