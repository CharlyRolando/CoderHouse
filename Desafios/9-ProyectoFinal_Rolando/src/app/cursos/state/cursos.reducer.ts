import { createReducer, on } from '@ngrx/store';
import { Curso } from '../interfaces/curso';
import * as CursosActions from './cursos.actions';

export const cursosFeatureKey = 'cursos';

export interface CursosState {
loading: boolean,
cursos: Curso[]
}

export const cursosInitialState: CursosState = {
loading: false,
cursos:[]
};



export const cursoReducer = createReducer(
  cursosInitialState,

  on(CursosActions.loadCursos, (state) => (
    {
      ...state,
      loading: true,
      cursos: []
    }
  )),

on(CursosActions.loadCursosSuccess, (state, action) => (
  {
    ...state,
    loading: false,
    cursos: action.cursos
  }
)),

on(CursosActions.loadCursosFailure, (state, {error}) => (
state
)),

on(CursosActions.addCurso, (state, action) => (
  state
)),

on(CursosActions.editCurso, (state, action) => (
  state
)),

on(CursosActions.deleteCurso, (state, action) => (
  state
))


);






