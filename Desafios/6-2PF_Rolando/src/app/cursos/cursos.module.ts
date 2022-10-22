import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { FormCursoComponent } from './components/form-curso/form-curso.component';
import { GridCursosComponent } from './components/grid-cursos/grid-cursos.component';
import { SharedModule } from '../shared/shared.module';
import { FileUploadComponent } from '../shared/components/file-upload/file-upload.component';
import { ConfirmacionDialogComponent } from '../shared/components/confirmacion-dialog/confirmacion-dialog.component';
import { PipesModule } from '../pipes/pipes.module';
import { DirectivesModule } from '../directives/directives.module';


@NgModule({
  declarations: [
    FormCursoComponent,
    GridCursosComponent,
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    SharedModule,
    PipesModule,
    DirectivesModule
  ]
})
export class CursosModule { }
