import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { GridAlumnosComponent } from './components/grid-alumnos/grid-alumnos.component';
import { CoreModule } from '../_core/core.module';
import { FormAlumnoComponent } from './components/form-alumno/form-alumno.component';
import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos.component';
import { DetallesAlumnoComponent } from './components/detalles-alumno/detalles-alumno.component';


@NgModule({
  declarations: [
    FormAlumnoComponent,
    GridAlumnosComponent,
    ListaAlumnosComponent,
    DetallesAlumnoComponent,
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    CoreModule,
  ]
})
export class AlumnosModule { }
