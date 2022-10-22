import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { GridUsuariosComponent } from './components/grid-usuarios/grid-usuarios.component';
import { FormUsuarioComponent } from './components/form-usuario/form-usuario.component';
import { SharedModule } from '../_shared/shared.module';
import { DirectivesModule } from '../_shared/directives/directives.module';


@NgModule({
  declarations: [
    FormUsuarioComponent,
    GridUsuariosComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
    DirectivesModule
  ]
})
export class UsuariosModule { }
