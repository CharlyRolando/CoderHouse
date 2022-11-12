import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { FormCursoComponent } from './components/form-curso/form-curso.component';
import { GridCursosComponent } from './components/grid-cursos/grid-cursos.component';
import { CoreModule } from '../_core/core.module';
import { DetallesCursoComponent } from './components/detalles-curso/detalles-curso.component';


@NgModule({
  declarations: [
    FormCursoComponent,
    GridCursosComponent,
    DetallesCursoComponent,
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    CoreModule,
  ]
})
export class CursosModule { }