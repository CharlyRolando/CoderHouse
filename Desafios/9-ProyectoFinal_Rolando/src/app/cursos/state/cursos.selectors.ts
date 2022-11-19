import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Curso } from '../interfaces/curso';
import * as fromCursos from './cursos.reducer';


export const selectCursosState = createFeatureSelector<fromCursos.CursosState>(
  fromCursos.cursosFeatureKey
);



export const selectCursosLoading = createSelector(
  selectCursosState,
  (state: fromCursos.CursosState) => state.loading
);


export const selectCursos = createSelector(
  selectCursosState,
  (state: fromCursos.CursosState) => state.cursos
);


export const selectCurso = (cursoId:string) => createSelector(
  selectCursos,
  (cursos: Curso[]) => {
    return cursos.filter(u => u.id == cursoId)[0]
  }
);




