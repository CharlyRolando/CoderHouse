import { createReducer, on } from '@ngrx/store';
import { InscripcionEntidad } from '../interfaces/inscripcion-entidad';
import * as InscripcionesEntidadActions from './inscripciones-entidad.actions';

export const inscripcionesEntidadFeatureKey = 'inscripciones-entidad';



export interface InscripcionesEntidadState {
  loading: boolean,
  inscripciones: InscripcionEntidad[]
}

export const inscripcionesEntidadInitialState: InscripcionesEntidadState = {
  loading: false,
  inscripciones: []
};


export const inscripcionEntidadReducer = createReducer(
  inscripcionesEntidadInitialState,

  on(InscripcionesEntidadActions.loadInscripcionesEntidad, (state) => (
    {
      ...state,
      loading: true,
      inscripciones: []
    }
  )),

on(InscripcionesEntidadActions.loadInscripcionesEntidadSuccess, (state, action) => (
  {
    ...state,
    loading: false,
    inscripciones: action.inscripciones
  }
)),

on(InscripcionesEntidadActions.loadInscripcionesEntidadFailure, (state, {error}) => (
state
)),

on(InscripcionesEntidadActions.addInscripcionEntidad, (state, action) => (
  state
)),

on(InscripcionesEntidadActions.editInscripcionEntidad, (state, action) => (
  state
)),

on(InscripcionesEntidadActions.deleteInscripcionEntidad, (state, action) => (
  state
))


);






