import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { SharedModule } from '../_shared/shared.module';
import { GridInscripcionesComponent } from './components/grid-inscripciones/grid-inscripciones.component';
import { FormInscripcionComponent } from './components/form-inscripcion/form-inscripcion.component';
import { EffectsModule } from '@ngrx/effects';
import { InscripcionesEffects } from './state/inscripciones.effects';
import { StoreModule } from '@ngrx/store';
import { inscripcionesFeatureKey, inscripcionReducer } from './state/inscripciones.reducer';
import { inscripcionEntidadReducer, inscripcionesEntidadFeatureKey } from './state/inscripciones-entidad.reducer';
import { InscripcionesEntidadEffects } from './state/inscripciones-entidad.effects';
import { alumnoReducer, alumnosFeatureKey } from '../alumnos/state/alumnos.reducer';
import { AlumnosEffects } from '../alumnos/state/alumnos.effects';


@NgModule({
  declarations: [
    FormInscripcionComponent,
    GridInscripcionesComponent
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    SharedModule,
    StoreModule.forFeature(inscripcionesFeatureKey, inscripcionReducer),
    StoreModule.forFeature(inscripcionesEntidadFeatureKey, inscripcionEntidadReducer),
    StoreModule.forFeature(alumnosFeatureKey, alumnoReducer),
    EffectsModule.forFeature([InscripcionesEffects, InscripcionesEntidadEffects, AlumnosEffects]),
  ]
})
export class InscripcionesModule { }
