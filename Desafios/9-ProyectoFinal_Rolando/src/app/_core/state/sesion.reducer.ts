import { createReducer, on } from '@ngrx/store';
import { Sesion } from 'src/app/autenticacion/interfaces/sesion';
import * as SesionActions from './sesion.actions';


export const sesionFeatureKey = 'sesion';

export const sesionInitialState: Sesion = {
  sesionActiva: false
};

export const sesionReducer = createReducer(
  sesionInitialState,

  on(SesionActions.loadSesion, state => state),

  on(SesionActions.loadSesionActiva, (state, {usuarioActivo}) => {
    return {...state, sesionActiva: true, usuarioActivo: usuarioActivo}
  })

);
