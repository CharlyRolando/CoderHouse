import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Usuario } from '../interfaces/usuario';
import * as fromUsuarios from './usuarios.reducer';



export const selectUsuariosState = createFeatureSelector<fromUsuarios.UsuariosState>(
  fromUsuarios.usuariosFeatureKey
);


export const selectUsuariosLoading = createSelector(
  selectUsuariosState,
  (state: fromUsuarios.UsuariosState) => state.loading
);


export const selectUsuarios = createSelector(
  selectUsuariosState,
  (state: fromUsuarios.UsuariosState) => state.usuarios
);


export const selectUsuario = (usuarioId:string) => createSelector(
  selectUsuarios,
  (usuarios: Usuario[]) => {
    return usuarios.filter(u => u.id == usuarioId)[0]
  }
);


