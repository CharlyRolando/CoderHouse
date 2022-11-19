import { Action, createReducer, on } from '@ngrx/store';
import { Alumno } from '../interfaces/alumno';
import * as AlumnosActions from './alumnos.actions';

export const alumnosFeatureKey = 'alumnos';

export interface AlumnosState {
  loading: boolean,
  alumnos: Alumno[]
}

export const alumnosInitialState: AlumnosState = {
  loading: false,
  alumnos: []
};


export const alumnoReducer = createReducer(
  alumnosInitialState,

  on(AlumnosActions.loadAlumnos, (state) => (
    {
      ...state,
      loading: true,
      alumnos: []
    }
  )),

on(AlumnosActions.loadAlumnosSuccess, (state, action) => (
  {
    ...state,
    loading: false,
    alumnos: action.alumnos
  }
)),

on(AlumnosActions.loadAlumnosFailure, (state, {error}) => (
state
)),

on(AlumnosActions.addAlumno, (state, action) => (
  state
)),

on(AlumnosActions.editAlumno, (state, action) => (
  state
)),

on(AlumnosActions.deleteAlumno, (state, action) => (
  state
))


);






