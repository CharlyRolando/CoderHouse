import { createAction, props } from '@ngrx/store';
import { Curso } from '../interfaces/curso';



export const loadCursos = createAction(
  '[Cursos] Load Cursos'
);

export const loadCursosSuccess = createAction(
  '[Cursos] Load Cursoss Succes',
  props<{ cursos: Curso[] }>()
);

export const loadCursosFailure = createAction(
  '[Cursos] Load Cursos Failure',
  props<{ error: any }>()
);




export const addCurso = createAction(
  '[Cursos] Add Curso',
  props<{curso: Curso}>()
 );

 export const editCurso = createAction(
   '[Cursos] Edit Curso',
   props<{curso:Curso}>()
 );

 export const deleteCurso = createAction(
   '[Cursos] Delete Curso',
   props<{id: string}>()
 );



