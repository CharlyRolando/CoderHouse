import { Action, createReducer, on } from '@ngrx/store';
import { Inscripcion } from '../interfaces/inscripcion';
import * as InscripcionesActions from './inscripciones.actions';

export const inscripcionesFeatureKey = 'inscripciones';



export interface InscripcionesState {
  loading: boolean,
  inscripciones: Inscripcion[]
}

export const inscripcionesInitialState: InscripcionesState = {
  loading: false,
  inscripciones: []
};


export const inscripcionReducer = createReducer(
  inscripcionesInitialState,

  on(InscripcionesActions.loadInscripciones, (state) => (
    {
      ...state,
      loading: true,
      inscripciones: []
    }
  )),

on(InscripcionesActions.loadInscripcionesSuccess, (state, action) => (
  {
    ...state,
    loading: false,
    inscripciones: action.inscripciones
  }
)),

on(InscripcionesActions.loadInscripcionesFailure, (state, {error}) => (
state
)),

on(InscripcionesActions.addInscripcion, (state, action) => (
  state
)),

on(InscripcionesActions.editInscripcion, (state, action) => (
  state
)),

on(InscripcionesActions.deleteInscripcion, (state, action) => (
  state
))


);






