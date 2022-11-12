import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { CoreModule } from '../_core/core.module';
import { PipesModule } from '../_core/pipes/pipes.module';
import { DirectivesModule } from '../_core/directives/directives.module';
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
    CoreModule,

  ]
})
export class InscripcionesModule { }
