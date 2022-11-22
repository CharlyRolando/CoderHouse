import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { GridAlumnosComponent } from './components/grid-alumnos/grid-alumnos.component';
import { SharedModule } from '../_shared/shared.module';
import { FormAlumnoComponent } from './components/form-alumno/form-alumno.component';
import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos.component';
import { DetallesAlumnoComponent } from './components/detalles-alumno/detalles-alumno.component';
import { EffectsModule } from '@ngrx/effects';
import { AlumnosEffects } from './state/alumnos.effects';
import { StoreModule } from '@ngrx/store';
import { alumnoReducer, alumnosFeatureKey } from './state/alumnos.reducer';
import { InscripcionesEntidadEffects } from '../inscripciones/state/inscripciones-entidad.effects';
import { inscripcionEntidadReducer, inscripcionesEntidadFeatureKey } from '../inscripciones/state/inscripciones-entidad.reducer';


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
    SharedModule,
    StoreModule.forFeature(alumnosFeatureKey, alumnoReducer),
    StoreModule.forFeature(inscripcionesEntidadFeatureKey, inscripcionEntidadReducer),
    EffectsModule.forFeature([AlumnosEffects, InscripcionesEntidadEffects]),
  ]
})
export class AlumnosModule { }
