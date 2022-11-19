import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, exhaustMap } from 'rxjs/operators';
import * as UsuariosActions from './usuarios.actions';
import { UsuariosService } from '../services/usuarios.service';
import { Usuario } from '../interfaces/usuario';
import { of } from 'rxjs';


@Injectable()
export class UsuariosEffects {

  constructor(
    private actions$: Actions,
    private usuariosService: UsuariosService
  ) { }


  loadAPIUsuarios$ = createEffect(() => {
    return this.actions$.pipe(ofType(UsuariosActions.loadUsuarios),
      exhaustMap(() => this.usuariosService.getUsuarios().pipe(
          map((usuarios: Usuario[]) => UsuariosActions.loadUsuariosSuccess({ usuarios })),
          catchError(error => of(UsuariosActions.loadUsuariosFailure({ error })))
        )
      )
    );
  });

  addAPIUsuario$ = createEffect(() => {
    return this.actions$.pipe(ofType(UsuariosActions.addUsuario),
      concatMap((action) => this.usuariosService.addUsuario(action.usuario).pipe(
          map((usuario: Usuario) => UsuariosActions.loadUsuarios()),
          catchError(error => of(UsuariosActions.loadUsuariosFailure({ error })))
        )
      )
    );
  });

  editAPIUsuario$ = createEffect(() => {
    return this.actions$.pipe(ofType(UsuariosActions.editUsuario),
      concatMap((action) => this.usuariosService.editUsuario(action.usuario).pipe(
          map((usuario: Usuario) => UsuariosActions.loadUsuarios()),
          catchError(error => of(UsuariosActions.loadUsuariosFailure({ error })))
        )
      )
    );
  });

  deleteAPIUsuario$ = createEffect(() => {
    return this.actions$.pipe(ofType(UsuariosActions.deleteUsuario),
      concatMap((action) => this.usuariosService.deleteUsuario(action.id).pipe(
          map(() => UsuariosActions.loadUsuarios()),
          catchError(error => of(UsuariosActions.loadUsuariosFailure({ error })))
        )
      )
    );
  });



}
