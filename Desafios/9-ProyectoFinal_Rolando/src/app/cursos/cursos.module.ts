import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { FormCursoComponent } from './components/form-curso/form-curso.component';
import { GridCursosComponent } from './components/grid-cursos/grid-cursos.component';
import { SharedModule } from '../_shared/shared.module';
import { DetallesCursoComponent } from './components/detalles-curso/detalles-curso.component';
import { EffectsModule } from '@ngrx/effects';
import { CursosEffects } from './state/cursos.effects';
import { StoreModule } from '@ngrx/store';
import { cursoReducer, cursosFeatureKey } from './state/cursos.reducer';
import { InscripcionesEntidadEffects } from '../inscripciones/state/inscripciones-entidad.effects';
import { inscripcionEntidadReducer, inscripcionesEntidadFeatureKey } from '../inscripciones/state/inscripciones-entidad.reducer';
import { alumnoReducer, alumnosFeatureKey } from '../alumnos/state/alumnos.reducer';
import { AlumnosEffects } from '../alumnos/state/alumnos.effects';


@NgModule({
  declarations: [
    FormCursoComponent,
    GridCursosComponent,
    DetallesCursoComponent,
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    SharedModule,
    StoreModule.forFeature(cursosFeatureKey, cursoReducer),
    StoreModule.forFeature(alumnosFeatureKey, alumnoReducer),
    StoreModule.forFeature(inscripcionesEntidadFeatureKey, inscripcionEntidadReducer),
    EffectsModule.forFeature([CursosEffects, AlumnosEffects, InscripcionesEntidadEffects]),
  ]
})
export class CursosModule { }
