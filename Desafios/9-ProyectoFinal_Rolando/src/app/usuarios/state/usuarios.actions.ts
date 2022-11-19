import { createAction, props } from '@ngrx/store';
import { Usuario } from '../interfaces/usuario';



export const loadUsuarios = createAction(
  '[Usuarios] Load Usuarios'
);

export const loadUsuariosSuccess = createAction(
  '[Usuarios] Load Usuarios Success',
  props<{ usuarios: Usuario[] }>()
);

export const loadUsuariosFailure = createAction(
  '[Usuarios] Load Usuarios Failure',
  props<{ error: any }>()
);


export const addUsuario = createAction(
  '[Usuarios] Add Usuario',
  props<{ usuario: Usuario }>()
);

export const editUsuario = createAction(
  '[Usuarios] Edit Usuario',
  props<{ usuario: Usuario }>()
);

export const deleteUsuario = createAction(
  '[Usuarios] Delete Usuario',
  props<{id: string}>()
);
