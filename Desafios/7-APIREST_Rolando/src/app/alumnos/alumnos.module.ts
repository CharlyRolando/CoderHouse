import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { GridAlumnosComponent } from './components/grid-alumnos/grid-alumnos.component';
import { SharedModule } from '../_shared/shared.module';
import { PipesModule } from '../_shared/pipes/pipes.module';
import { DirectivesModule } from '../_shared/directives/directives.module';
import { FormAlumnoComponent } from './components/form-alumno/form-alumno.component';
import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos.component';


@NgModule({
  declarations: [
    FormAlumnoComponent,
    GridAlumnosComponent,
    ListaAlumnosComponent,
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    SharedModule,
    PipesModule,
    DirectivesModule
  ]
})
export class AlumnosModule { }
