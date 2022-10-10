import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { MainComponent } from './components/layout/main/main.component';
import { ToolbarComponent } from './components/layout/toolbar/toolbar.component';

import { LoginComponent } from './components/login/login.component';

import { FormAlumnoComponent } from './components/alumnos/form-alumno/form-alumno.component';
import { GridAlumnosComponent } from './components/alumnos/grid-alumnos/grid-alumnos.component';
import { FormUsuarioComponent } from './components/usuarios/form-usuario/form-usuario.component';
import { GridUsuariosComponent } from './components/usuarios/grid-usuarios/grid-usuarios.component';
import { FormCursoComponent } from './components/cursos/form-curso/form-curso.component';
import { GridCursosComponent } from './components/cursos/grid-cursos/grid-cursos.component';
import { ComaDecimalPipe } from './pipes/coma-decimal.pipe';
import { TildeBooleanoDirective } from './directives/tilde-booleano.directive';
import { SoloNumerosDirective } from './directives/solo-numeros.directive';
import { ConfirmacionDialogComponent } from './components/confirmacion-dialog/confirmacion-dialog.component';
import { TemaTitulosDirective } from './directives/tema-titulos.directive';
import { NombreCompletoPipe } from './pipes/nombre-completo.pipe';
import { IdToValuePipe } from './pipes/id-to-value.pipe';
import { ArrayIdToNamePipe } from './pipes/array-id-to-name.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainComponent,
    ToolbarComponent,
    LoginComponent,
    FormAlumnoComponent,
    GridAlumnosComponent,
    FormUsuarioComponent,
    GridUsuariosComponent,
    FormCursoComponent,
    GridCursosComponent,
    ComaDecimalPipe,
    TildeBooleanoDirective,
    SoloNumerosDirective,
    ConfirmacionDialogComponent,
    TemaTitulosDirective,
    NombreCompletoPipe,
    IdToValuePipe,
    ArrayIdToNamePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  entryComponents: [ConfirmacionDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
