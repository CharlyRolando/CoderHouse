import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../interfaces/usuario';
import * as UsuariosActions from './usuarios.actions';

export const usuariosFeatureKey = 'usuarios';

export interface UsuariosState {
  loading: boolean,
  usuarios: Usuario[]
}

export const usuariosInitialState: UsuariosState = {
  loading: false,
  usuarios: []
};


export const usuarioReducer = createReducer(
  usuariosInitialState,


  on(UsuariosActions.loadUsuarios, (state) => (
    {
      ...state,
      loading: true,
      usuarios: []
    }
  )),


  on(UsuariosActions.loadUsuariosSuccess, (state, action) => (
    {
      ...state,
      loading: false,
      usuarios: action.usuarios
    }
  )),

  on(UsuariosActions.loadUsuariosFailure, (state, { error }) =>
    state
  ),


  on(UsuariosActions.addUsuario, (state, action) => (
    state
  )),

  on(UsuariosActions.editUsuario, (state, action) => (
    state
  )),

  on(UsuariosActions.deleteUsuario, (state, action) => (
    state
  )),



);



