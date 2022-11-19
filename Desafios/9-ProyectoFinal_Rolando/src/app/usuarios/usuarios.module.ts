import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { GridUsuariosComponent } from './components/grid-usuarios/grid-usuarios.component';
import { FormUsuarioComponent } from './components/form-usuario/form-usuario.component';
import { DetallesUsuarioComponent } from './components/detalles-usuario/detalles-usuario.component';
import { SharedModule } from '../_shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { usuarioReducer, usuariosFeatureKey } from './state/usuarios.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsuariosEffects } from './state/usuarios.effects';



@NgModule({
  declarations: [
    FormUsuarioComponent,
    GridUsuariosComponent,
    DetallesUsuarioComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
    StoreModule.forFeature(usuariosFeatureKey, usuarioReducer),
    EffectsModule.forFeature([UsuariosEffects])
  ]
})
export class UsuariosModule { }
