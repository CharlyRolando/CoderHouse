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
    EffectsModule.forFeature([CursosEffects]),
  ]
})
export class CursosModule { }
