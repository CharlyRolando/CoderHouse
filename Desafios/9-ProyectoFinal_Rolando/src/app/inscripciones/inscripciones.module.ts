import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { SharedModule } from '../_shared/shared.module';
import { PipesModule } from '../_shared/pipes/pipes.module';
import { DirectivesModule } from '../_shared/directives/directives.module';
import { GridInscripcionesComponent } from './components/grid-inscripciones/grid-inscripciones.component';
import { FormInscripcionComponent } from './components/form-inscripcion/form-inscripcion.component';


@NgModule({
  declarations: [
    FormInscripcionComponent,
    GridInscripcionesComponent
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    SharedModule,

  ]
})
export class InscripcionesModule { }
