import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { SharedModule } from '../_shared/shared.module';
import { GridInscripcionesComponent } from './components/grid-inscripciones/grid-inscripciones.component';
import { FormInscripcionComponent } from './components/form-inscripcion/form-inscripcion.component';
import { EffectsModule } from '@ngrx/effects';
import { InscripcionesEffects } from './state/inscripciones.effects';
import { inscripcionesFeatureKey, inscripcionReducer } from './state/inscripciones.reducer';
import { StoreModule } from '@ngrx/store';


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
    EffectsModule.forFeature([InscripcionesEffects]),
  ]
})
export class InscripcionesModule { }
